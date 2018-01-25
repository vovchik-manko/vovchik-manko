package com.vmrestaurant.springbootwithangular;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/tables")
public class TablesController {
    private int tableId = 0;
    private List<Table> tables = new ArrayList<>();

    TablesController() {
        this.tables = buildTables();
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Table> getTables() {
        return this.tables;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Table getTable(@PathVariable("id") Long id) {
        return this.tables.stream().filter(table -> table.getId() == id).findFirst().orElse(null);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Table saveTable(@RequestBody Table table) {
        table.setId(++tableId);
        this.tables.add(table);
        return table;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public Table processTable(@RequestBody Table table) {
        Table modifiedTable = this.tables.stream().filter(t -> t.getId() == table.getId()).findFirst().orElse(null);
        if(modifiedTable != null) {
            modifiedTable.setClientName(table.getClientName());
            modifiedTable.setStatus(table.getStatus());
            modifiedTable.setOrders(table.getOrders());
        }
        return modifiedTable;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public boolean deleteTable(@PathVariable Long id) {
        Table deleteTable = this.tables.stream().filter(t -> t.getId() == id).findFirst().orElse(null);
        boolean isTableToDelete = deleteTable != null;

        if(isTableToDelete) {
            this.tables.remove(deleteTable);
        }
        return isTableToDelete;
    }

    List<Table> buildTables() {
        List<Table> tables = new ArrayList<>();

        tables.add(buildTable(2));
        tables.add(buildTable(2));
        tables.add(buildTable(2));
        tables.add(buildTable(4));
        tables.add(buildTable(4));
        tables.add(buildTable(4));
        tables.add(buildTable(4));
        tables.add(buildTable(8));

        return tables;
    }

    Table buildTable(int maxPersons) {
        Table table = new Table();
        table.setId(++tableId);
        table.setMaxPersons(maxPersons);
        return table;
    }

    Order buildOrder(Order o) {
        Order order = new Order();
        order.setClientName(o.getClientName());
        order.setStatus(o.getStatus());
        order.setTableId(o.getTableId());
        order.setTotal(o.getTotal());
        order.setItemsOrdered(o.getItemsOrdered());

        return order;
    }
}