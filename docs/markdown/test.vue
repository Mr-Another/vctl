<template>
  <div>
    <p>
      <Button color="blue" icon="icon-plus" @click="add(datas)">添加一行</Button>
    </p>
    <Table :datas="datas" stripe checkbox>
      <TableItem title="Index" :tooltip="true">
        <template slot-scope="{index}">{{index}}</template>
      </TableItem>
      <TableItem title="Name" prop="name" sort="auto"></TableItem>
      <TableItem title="Age" prop="age"></TableItem>
      <TableItem title="Address" align="center" prop="address"></TableItem>
      <TableItem title="Operate">
        <template slot-scope="{data}">{{data.name}}: 自定义展示</template>
      </TableItem>
      <div slot="empty">自定义提醒：暂时无数据</div>
    </Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: [
        { id: 5, name: "测试5", age: 12, address: "上海" },
        { id: 6, name: "测试6", age: 12, address: "上海" },
        { id: 7, name: "测试7", age: 12, address: "上海" },
        { id: 5, name: "测试5", age: 12, address: "上海" },
        { id: 6, name: "测试6", age: 12, address: "上海" },
        { id: 7, name: "测试7", age: 12, address: "上海" }
      ]
    };
  },
  methods: {
    add(datas) {
      datas.push({ id: 7, name: "添加", age: 12, address: "然后添加的" });
    }
  }
};
</script>