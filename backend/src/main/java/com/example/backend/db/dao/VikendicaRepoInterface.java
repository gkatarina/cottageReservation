package com.example.backend.db.dao;

import java.util.List;

import com.example.backend.models.Vikendica;

public interface VikendicaRepoInterface {
    public List<Vikendica> getAll();
    public Vikendica getOne(String imeVikendice);
    // public Vikendica 
}
