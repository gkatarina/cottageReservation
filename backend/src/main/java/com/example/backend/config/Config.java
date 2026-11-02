package com.example.backend.config;

import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class Config implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // if (!registry.hasMappingForPattern("/uploads/**")) {
        //     registry.addResourceHandler("/uploads/**").addResourceLocations(
        //             "classpath:/images/uploads/");
        // }
        registry.addResourceHandler("/uploads/**").addResourceLocations("file:/home/katarina/projekat/images/uploads");
        registry.addResourceHandler("/gallery/**").addResourceLocations("file:/home/katarina/projekat/images/gallery"); //TODO promeniti ove hardkodirane putanje jbg

        // registry.addResourceHandler("/uploads/**").addResourceLocations("classpath:/static/images/uploads");
        // registry.addResourceHandler("/gallery/**").addResourceLocations("classpath:/static/images/gallery");
    }

}
