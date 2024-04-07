package com.rs.rmk.btl_ltnc.service.scheduleService;

import com.rs.rmk.btl_ltnc.model.task.taskModel;
import com.rs.rmk.btl_ltnc.repository.scheduleRepository.scheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class scheduleService  {
    @Autowired
    private scheduleRepository scheduleRepository;

    public List<List<taskModel>> getSchedule(String doctorName) throws ExecutionException, InterruptedException {
        return scheduleRepository.getSchedule(doctorName);
    }

    public boolean addTask(String doctorName, taskModel task) throws ExecutionException, InterruptedException, ParseException {
        Date day = new SimpleDateFormat("dd/MM/yyyy").parse(task.getDay());
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(day);
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
        String date = dayOfWeek == 1 ? "CN" : "Thu" + Integer.toString(dayOfWeek);
        //Set id for task
        LocalTime now = LocalTime.now();
        task.setId(now.toString());
        return scheduleRepository.addTask(doctorName, task, date);
    }
}
