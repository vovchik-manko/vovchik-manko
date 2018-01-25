package com.vmrestaurant.springbootwithangular;

import java.util.ArrayList;

public class Order {
    private long id;
    private long tableId;
    private String clientName;
    private String status;

    private long total;
    private ArrayList<ItemOrdered> itemsOrdered;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getTableId() {
        return tableId;
    }

    public void setTableId(long tableId) {
        this.tableId = tableId;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public ArrayList<ItemOrdered> getItemsOrdered() {
        return itemsOrdered;
    }

    public void setItemsOrdered(ArrayList<ItemOrdered> itemsOrdered) {
        this.itemsOrdered = itemsOrdered;
    }
}
