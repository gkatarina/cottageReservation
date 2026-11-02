package com.example.backend.controllers;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController 
@Controller
@RequestMapping("/")
public class StaticImageServeController {
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
    try {
        Path uploadPath = Paths.get("/home/katarina/projekat/images/uploads");
        System.out.println("aloooooooooo ");
        Path filePath = uploadPath.resolve(file.getOriginalFilename());
        Files.write(filePath, file.getBytes());
        return ResponseEntity.ok("File uploaded successfully");
    } catch (IOException e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed");
    }
    }
    @PostMapping("/gallery")
    public ResponseEntity<String> uploadFileGallery(@RequestParam("file") MultipartFile file) {
    try {
        Path uploadPath = Paths.get("/home/katarina/projekat/images/gallery");
        System.out.println("aloooooooooo galerija aloo");
        Path filePath = uploadPath.resolve(file.getOriginalFilename());
        Files.write(filePath, file.getBytes());
        return ResponseEntity.ok("File uploaded successfully");
    } catch (IOException e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed");
        }
    }
    @GetMapping("/upload/{filename}")
    public ResponseEntity<UrlResource> getFile(@PathVariable String filename) throws MalformedURLException {
        Path file = Paths.get("/home/katarina/projekat/images/uploads").resolve(filename);
        System.out.println(file);
        UrlResource resource = new UrlResource(file.toUri());
        if (!resource.exists() || !resource.isReadable()) {
            return ResponseEntity.notFound().build();
        }
        String contentType = null;
        try {
            contentType = Files.probeContentType(file);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        if (contentType == null) 
            contentType = "application/octet-stream";
        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(contentType))
            .body(resource);
    }
    @GetMapping("/gallery/{filename}")
    public ResponseEntity<UrlResource> getGallery(@PathVariable String filename) throws MalformedURLException {
        Path file = Paths.get("/home/katarina/projekat/images/gallery").resolve(filename);
        System.out.println(file);
        UrlResource resource = new UrlResource(file.toUri());
        if (!resource.exists() || !resource.isReadable()) {
            return ResponseEntity.notFound().build();
        }
        String contentType = null;
        try {
            contentType = Files.probeContentType(file);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        if (contentType == null) 
            contentType = "application/octet-stream";
        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(contentType))
            .body(resource);
        }
}
