<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <!-- <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell>{{ item.name }}</md-table-cell>
        <md-table-cell>{{ item.country }}</md-table-cell>
        <md-table-cell>{{ item.city }}</md-table-cell>
        <md-table-cell>{{ item.salary }}</md-table-cell>
      </md-table-row> -->
      <md-table-row v-for="column of columns" :key="column.id">
        <md-table-cell>{{ column.id }}</md-table-cell>
        <!-- <md-table-cell>{{ item.country }}</md-table-cell>
        <md-table-cell>{{ item.city }}</md-table-cell>
        <md-table-cell>{{ item.salary }}</md-table-cell> -->
      </md-table-row>
    </md-table>
  </div>
</template>
<!-- md-label="Salary" -->
<script>
export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
    columns: {},
  },
  mounted() {
    console.log(
      123,
      this.columns.map((el) => el)
    );
  },
  data() {
    return {
      selected: [],
      users: [
        {
          name: "Dakota Rice",
          salary: "$36,738",
          country: "Niger",
          city: "Oud-Turnhout",
        },
        {
          name: "Minerva Hooper",
          salary: "$23,738",
          country: "Curaçao",
          city: "Sinaai-Waas",
        },
        {
          name: "Sage Rodriguez",
          salary: "$56,142",
          country: "Netherlands",
          city: "Overland Park",
        },
        {
          name: "Philip Chaney",
          salary: "$38,735",
          country: "Korea, South",
          city: "Gloucester",
        },
        {
          name: "Doris Greene",
          salary: "$63,542",
          country: "Malawi",
          city: "Feldkirchen in Kārnten",
        },
        {
          name: "Mason Porter",
          salary: "$78,615",
          country: "Chile",
          city: "Gloucester",
        },
      ],
    };
  },
};
</script>
