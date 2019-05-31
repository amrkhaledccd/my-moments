package com.clone.instagram.instafeedservice.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PagedResult<T> {

    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
    private boolean last;
    private List<T> content;
}