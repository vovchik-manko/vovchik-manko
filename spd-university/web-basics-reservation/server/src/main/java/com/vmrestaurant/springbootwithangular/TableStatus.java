package com.vmrestaurant.springbootwithangular;

public enum TableStatus {
    AVAILABLE("available"),
    PROCESSING("processing");

    private String status;

    TableStatus(String status) {
        this.status = status;
    }
}
