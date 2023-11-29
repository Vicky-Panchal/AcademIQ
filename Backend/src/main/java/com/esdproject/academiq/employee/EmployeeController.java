package com.esdproject.academiq.employee;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/employee")
@RequiredArgsConstructor
//@PreAuthorize("hasRole('EMPLOYEE')")
public class EmployeeController {

    @Autowired
    private final EmployeeService employeeService;

    @GetMapping("/salary/{facultyId}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public Optional<List<EmployeeSalary>> getSalaryDetails(@PathVariable Integer facultyId) {
//        System.out.println(facultyId);
        // Extract faculty ID from token
        //Integer facultyId = TokenUtil.extractFacultyId(token);
        // Fetch salary details for the faculty
        Optional<List<EmployeeSalary>> details = employeeService.getSalaryDetails(facultyId);
        return details;
    }

    @GetMapping("/download")
    public ResponseEntity<Resource> downloadPdf(
            @RequestParam(value="path", required = false) String path
    ) {
        Resource file = new FileSystemResource(path);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=salarySlip.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(file);
    }

//    @GetMapping("/salary/history/{facultyId}")
//    public ResponseEntity<Optional<List<EmployeeSalary>>> getSalaryHistory(@PathVariable Integer facultyId) {
//        // Extract faculty ID from token
//        // Fetch salary history for the faculty
//        Optional<List<EmployeeSalary>> history = employeeService.getSalaryHistory(facultyId);
//        return ResponseEntity.ok(history);
//    }
}
