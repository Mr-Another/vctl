[[toc]]

## Tree 树

> 非 template/render 模式下，请使用 blue-tree。

### 基本调用

> 在传递的 param 参数中，定义基本的数据字段：keyName, parentName, titleName。

> 设定数据模式：dataMode, 当传递的数据为有 key,parent 字段的 list，则传递 list，组件会根据 key,parent 字段自动计算树模型(parent 可以是数组对应)，如果传递的数据本身就是树模型，则传递 tree。

:::demo

```html
<template>
  <div>
    <p>值：{{value}}</p>
    <p>
      <blue-switch v-model="toggleOnSelect" small>点击内容折叠内容</blue-switch>
    </p>
    <p>
      <blue-button @click="expandAll" size="xs">全部展开</blue-button>
      <blue-button @click="expand([2, 3])" size="xs">展开部分</blue-button>
      <blue-button @click="foldAll" size="xs">全部收起</blue-button>
      <blue-button @click="updateSelect" size="xs">设置选中值</blue-button>
      <blue-button @click="getSelect" size="xs">获得选中值</blue-button>
    </p>
    <Tree
      :option="param10"
      ref="demo"
      :toggle-on-select="toggleOnSelect"
      v-model="value"
      @open="open"
      @select="select"
      :render-content="renderContent"
    ></Tree>
  </div>
</template>
<script>
  export default {
    data() {
      let list = [
        { id: 1, title: "一级", treeIcon: "icon-user" },
        { id: 2, title: "二级", treeIcon: "icon-user" },
        { id: 3, title: "三级", disabled: true, treeIcon: "icon-user" },
        { id: 10, title: "一级-0", parent: 1 },
        { id: 11, title: "一级-1", parent: 1 },
        { id: 12, title: "一级-2", parent: 1 },
        { id: 13, title: "一级-3", parent: 1 },
        { id: 14, title: "一级-4", parent: 1 },
        { id: 20, title: "二级-0", parent: 2 },
        { id: 21, title: "二级-1", parent: 2 },
        { id: 22, title: "二级-2", parent: 2 },
        { id: 23, title: "二级-3", parent: 2 },
        { id: 24, title: "二级-4", parent: 2 },
        { id: 30, title: "三级-0", parent: 3 },
        { id: 31, title: "三级-1", parent: 3 },
        { id: 32, title: "三级-2", parent: 3 },
        { id: 33, title: "三级-3", parent: 3 },
        { id: 34, title: "三级-4", parent: 3 }
      ];
      return {
        toggleOnSelect: true,
        value: null,
        param: {
          keyName: "id",
          parentName: "parent",
          titleName: "title",
          dataMode: "list",
          datas: list
          // datas() { 可以使用方法
          //   return list;
          // }
        }
      };
    },
    methods: {
      expand(ids) {
        this.$refs.demo.expand(ids);
      },
      expandAll() {
        this.$refs.demo.expandAll();
      },
      foldAll() {
        this.$refs.demo.foldAll();
      },
      updateSelect() {
        // 两种方法都可以
        // this.$refs.demo.updateSelect(2);
        this.value = 21;
        this.$Message.info("选中二级-1");
      },
      getSelect() {
        let option = this.$refs.demo.getSelect();
        if (option == null) {
          this.$Message.info(`当前未选中`);
        } else {
          this.$Message.info(`当前选中: ${option.title}`);
        }
      },
      choose(data) {
        // console.log(data);
      },
      select(data) {
        // console.log(data);
      },
      open(data) {
        // console.log(data);
      },
      renderContent(h,{}){
         render(h) {
          return h('span', [
              h('span', '添加'),
              h('span', '删除')
          ])
      },
    }
  };
</script>
```

:::

### 多选，选择模式为 ALl

> `chooseMode`: all, 只有子集全选的时候，才会选中父级，如果父级选择，返回数据则只返回父级，子集不返回。

:::demo

```html
<template>
  <div>
    <p>值：{{value1}}</p>
    <p>
      <blue-button @click="updateChoose1" size="xs"
        >设置checkbox选中值</blue-button
      >
      <blue-button @click="getChoose1" size="xs"
        >获得checkbox选中值</blue-button
      >
      <blue-button @click="getFullChoose1" size="xs"
        >获得所有checkbox选中值</blue-button
      >
      <blue-button @click="chooseAll1" size="xs">选中所有值</blue-button>
    </p>
    <Tree
      :option="param"
      ref="demo1"
      v-model="value1"
      :multiple="true"
      choose-mode="all"
      @choose="choose1"
    ></Tree>
  </div>
</template>
<script>
  export default {
    data() {
      let list1 = [
        {
          id: 1,
          title: "一级",
          children: [
            { id: 10, title: "一级-0" },
            { id: 11, title: "一级-1" },
            { id: 12, title: "一级-2" },
            { id: 13, title: "一级-3" },
            { id: 14, title: "一级-4" }
          ]
        },
        {
          id: 2,
          title: "二级",
          children: [
            {
              id: 20,
              title: "二级-0",
              children: [
                { id: 201, title: "二级-0-1" },
                { id: 202, title: "二级-0-2" },
                { id: 203, title: "二级-0-3" }
              ]
            },
            { id: 21, title: "二级-1" },
            { id: 22, title: "二级-2" },
            { id: 23, title: "二级-3" },
            { id: 24, title: "二级-4" }
          ]
        },
        {
          id: 3,
          title: "三级",
          checkable: false,
          children: [
            { id: 30, title: "三级-0" },
            { id: 31, title: "三级-1" },
            { id: 32, title: "三级-2" },
            { id: 33, title: "三级-3" },
            { id: 34, title: "三级-4" }
          ]
        }
      ];
      return {
        value: [202],
        param: {
          keyName: "id",
          titleName: "title",
          dataMode: "tree",
          datas: list
        }
      };
    },
    methods: {
      choose1(data) {
        console.log(data);
      },
      chooseAll1() {
        this.$refs.demo1.chooseAll();
      },
      updateChoose1() {
        // 两种方法都可以
        // this.value = [11, 23, 201, 202, 203]
        this.$refs.demo1.updateChoose([1, 23, 31]);
      },
      getChoose1() {
        let options = this.$refs.demo1.getChoose();
        if (options.length == 0) {
          this.$Message.info(`当前未选中`);
        } else {
          this.$Message.info(`当前选中: ${options.length}个`);
        }
      },
      getFullChoose1() {
        let options = this.$refs.demo1.getFullChoose();
        console.log(options);
        this.$Message.info(`当前选中: ${options.length}个`);
      }
    }
  };
</script>
```

:::

### 全部数据异步加载

:::demo

```html
<template>
  <div>
    <p>
      <blue-button @click="refresh" size="xs">刷新</blue-button>
    </p>
    <Tree
      :option="param"
      ref="demo4"
      @load-data-success="loadDataSuccess"
    ></Tree>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        param: {
          keyName: "id",
          parentName: "parent",
          titleName: "title",
          dataMode: "list",
          getTotalDatas: resolve => {
            setTimeout(() => {
              // param中的dataMode同样对这里的数据有效
              let list = [
                { id: 1, title: "一级" },
                { id: 2, title: "二级" },
                { id: 3, title: "三级", disabled: true },
                { id: 10, title: "一级-0", parent: "1" },
                { id: 11, title: "一级-1", parent: "1" },
                { id: 12, title: "一级-2", parent: "1" },
                { id: 13, title: "一级-3", parent: "1" },
                { id: 14, title: "一级-4", parent: "1" },
                { id: 20, title: "二级-0", parent: "2" },
                { id: 21, title: "二级-1", parent: "2" },
                { id: 22, title: "二级-2", parent: "2" },
                { id: 23, title: "二级-3", parent: "2" },
                { id: 24, title: "二级-4", parent: "2" },
                { id: 30, title: "三级-0", parent: "3" },
                { id: 31, title: "三级-1", parent: "3" },
                { id: 32, title: "三级-2", parent: "3" },
                { id: 33, title: "三级-3", parent: "3" },
                { id: 34, title: "三级-4", parent: "3" }
              ];
              resolve(list);
            }, 1000);
          }
        }
      };
    },
    methods: {
      loadDataSuccess() {
        this.$Message.success("数据加载成功");
      },
      refresh() {
        this.$refs.demo.refresh();
      }
    }
  };
</script>
```

:::

### 分步异步加载

:::demo

```html
<template>
  <div>
    <Tree :option="param1" ref="demo5"></Tree>
  </div>
</template>
<script>
  const genList = (parentTitle, parentId, size, keyName, titleName) => {
    let list = [];
    for (let i = 0; i < size; i++) {
      list.push({
        [keyName]: parseInt(`${parentId}${i}`),
        [titleName]: `${parentTitle}-${i}`
      });
    }
    return list;
  };

  export default {
    data() {
      return {
        param1: {
          keyName: "id",
          titleName: "title",
          dataMode: "list",
          getDatas: (parent, resolve) => {
            setTimeout(() => {
              if (!parent) {
                resolve([
                  { id: 1, title: "一级", disabled: true },
                  { id: 2, title: "二级" },
                  { id: 3, title: "三级" }
                ]);
              } else if (parent.id % 2 == 0) {
                resolve([]);
              } else {
                resolve(genList(parent.title, parent.id, 5, "id", "title"));
              }
            }, 100);
          }
        }
      };
    },
    methods: {}
  };
</script>
```

:::

### Tree 参数

| 参数           | 说明                               | 类型    | 可选值                                                | 默认值                     |
| -------------- | ---------------------------------- | ------- | ----------------------------------------------------- | -------------------------- |
| chooseMode     | checkbox 选择模式                  | String  | all, some, independent                                | all                        |
| option         | 配置项，详细参见下面的 option 说明 | Object  | -                                                     |  -                          |
| multiple       | 多选                               | Boolean | -                                                     | false                      |
| filterable     | 是否可以搜索                       | Boolean | -                                                     | false                      |
| config         | 使用全局配置的方法                 | String  | -                                                     | -                          |
| toggleOnSelect | 是否在选中文本的时候折叠内容       | Boolean | -                                                     | false                      |
| selectOnClick  | 是否点击整行的时候选中，           | Boolean | -                                                     | false                      |
| className      | 主题，                             | String  | blue-tree-theme-item-selected, blue-tree-theme-row-selected | blue-tree-theme-item-selected |

### Tree 方法

| 方法           | 说明                   | 参数                               | 返回值     |
| -------------- | ---------------------- | ---------------------------------- | ---------- |
| updateChoose   | 更新选中值(多选)       | (keys, updateValue = true)         | -         |
| getChoose      | 获取选中值(多选)       | -                                 | [TreeItem] |
| updateSelect   | 更新选中值(单选)       | (keys, updateValue = true)         | -         |
| getSelect      | 获取选中值(单选)       | -                                 | TreeItem   |
| getFullChoose  | 获取所有选中的值(多选) | -                                 | [TreeItem] |
| chooseAll      | 选中所有值(多选)       | -                                 | -         |
| expandAll      | 展开所有的节点         | -                                | -         |
| expand         | 展开节点               | ([keys])                           | -         |
| foldAll        | 收起所有的折叠         | -                                 | -         |
| refresh        | 刷新数据               | -                                 | -         |
| updateTreeItem | 更新 TreeItem        | (key, { title: '' })               | -         |
| appendTreeItem | 插入 TreeItem       | (parentkey, { id: '', title: '' }) | -         |
| removeTreeItem | 删除 TreeItem        | (key)                              | -         |

### Tree 事件

| 参数            | 说明                                                                         |
| --------------- | ---------------------------------------------------------------------------- |
| input           | v-model 值变化                                                               |
| choose          | checkbox 选择变化                                                            |
| select          | tree 的 select 变化                                                          |
| open            | 当 tree 打开变化                                                             |
| loadDataSuccess | 当异步数据加载成功的时候触发，应用与有一些数据按照 tree 加载的数据执行的场景 |

### option 配置

| 参数          | 说明                                                             | 类型            | 可选值     | 默认值                             |
| ------------- | ---------------------------------------------------------------- | --------------- | ---------- | ---------------------------------- |
| keyName       | 数据的 key 对应字段                                              | String          | -          | 全局配置 tree.default.keyName      |
| titleName     | 数据的 title 对应字段                                            | String          | -          | 全局配置 tree.default.titleName    |
| parentName    | 数据的 parent 对应字段，配合数据类型为 list 的数据               | String          | -          | 全局配置 tree.default.parentName   |
| childrenName  | 数据的 children 对应字段，配合数据类型为 tree 的数据             | String          | -          | 全局配置 tree.default.childrenName |
| dataMode      | 提供的数据类型，是平铺需要解析的列表，还是已经生成好的 tree 数据 | String          | list, tree | -                                  |
| datas         | 用于 tree 展示的数据                                             | Array, Function | -          | []                                 |
| getTotalDatas | 异步获取用于 tree 展示的数据，一次性全部加载                     | Function        | -          | -                                  |
| getDatas      | 异步获取用于 tree 展示的数据，每一次单击获取子集                 | Function        | -          | -                                  |

### Slot

| 名称 | 参数                   | 说明        |
| ---- | ---------------------- | ----------- |
| item | item：对应的 tree 数据 | 内容的渲染, |

<script>

  const genList = (parentTitle, parentId, size, keyName, titleName) => {
    let list = [];
    for (let i = 0; i < size; i++) {
      list.push({
        [keyName]: parseInt(`${parentId}${i}`),
        [titleName]: `${parentTitle}-${i}`
      });
    }
    return list;
  };

export default {
  data() {
    let list = [
      { id: 1, title: '一级', treeIcon: 'icon-user' },
      { id: 2, title: '二级', treeIcon: 'icon-user' },
      { id: 3, title: '三级', disabled: true, treeIcon: 'icon-user' },
      { id: 10, title: '一级-0', parent: 1 },
      { id: 11, title: '一级-1', parent: 1 },
      { id: 12, title: '一级-2', parent: 1 },
      { id: 13, title: '一级-3', parent: 1 },
      { id: 14, title: '一级-4', parent: 1 },
      { id: 20, title: '二级-0', parent: 2 },
      { id: 21, title: '二级-1', parent: 2 },
      { id: 22, title: '二级-2', parent: 2 },
      { id: 23, title: '二级-3', parent: 2 },
      { id: 24, title: '二级-4', parent: 2 },
      { id: 30, title: '三级-0', parent: 3 },
      { id: 31, title: '三级-1', parent: 3 },
      { id: 32, title: '三级-2', parent: 3 },
      { id: 33, title: '三级-3', parent: 3 },
      { id: 34, title: '三级-4', parent: 3 }
    ];
    return {
      toggleOnSelect: true,
      value: null,
      value1:[],
      param: {
        keyName: 'id',
        parentName: 'parent',
        titleName: 'title',
        dataMode: 'list',
        datas: list,
        // datas() { 可以使用方法
        //   return list;
        // }

        getTotalDatas: resolve => {
            setTimeout(() => {
              // param中的dataMode同样对这里的数据有效
              let list = [
                { id: 1, title: "一级" },
                { id: 2, title: "二级" },
                { id: 3, title: "三级", disabled: true },
                { id: 10, title: "一级-0", parent: "1" },
                { id: 11, title: "一级-1", parent: "1" },
                { id: 12, title: "一级-2", parent: "1" },
                { id: 13, title: "一级-3", parent: "1" },
                { id: 14, title: "一级-4", parent: "1" },
                { id: 20, title: "二级-0", parent: "2" },
                { id: 21, title: "二级-1", parent: "2" },
                { id: 22, title: "二级-2", parent: "2" },
                { id: 23, title: "二级-3", parent: "2" },
                { id: 24, title: "二级-4", parent: "2" },
                { id: 30, title: "三级-0", parent: "3" },
                { id: 31, title: "三级-1", parent: "3" },
                { id: 32, title: "三级-2", parent: "3" },
                { id: 33, title: "三级-3", parent: "3" },
                { id: 34, title: "三级-4", parent: "3" }
              ];
              resolve(list);
            }, 1000);
          }
      },
      param10: {
          keyName: "id",
          parentName: "parent",
          titleName: "title",
          dataMode: "list",
          datas: list
          // datas() { 可以使用方法
          //   return list;
          // }
        },
      param1: {
        keyName: "id",
        titleName: "title",
        dataMode: "list",
        getDatas: (parent, resolve) => {
          setTimeout(() => {
            if (!parent) {
              resolve([
                { id: 1, title: "一级", disabled: true },
                { id: 2, title: "二级" },
                { id: 3, title: "三级" }
              ]);
            } else if (parent.id % 2 == 0) {
              resolve([]);
            } else {
              resolve(genList(parent.title, parent.id, 5, "id", "title"));
            }
          }, 100);
        }
      }
    };
  },
  methods: {
    renderContent(h,{key, data}) {
        return (
          <span>
            <blue-button size="xs" on-click={ () => this.appendTreeItem(key, data) }>添加</blue-button>
            <blue-button size="xs" on-click={ () => this.removeTreeItem(key) }>删除</blue-button>
          </span>
        )
    },
    appendTreeItem(key, value) {
      console.log(value);
      this.$refs.demo.appendTreeItem(key, value);
    },
    removeTreeItem(key) {
      this.$refs.demo.removeTreeItem(key);
    },
    expand(ids) {
      this.$refs.demo.expand(ids);
    },
    expandAll() {
      console.log(this.$refs)
      this.$refs.demo.expandAll();
    },
    foldAll() {
      this.$refs.demo.foldAll();
    },
    updateSelect() {
      // 两种方法都可以
      // this.$refs.demo.updateSelect(2);
      this.value = 21;
      this.$Message.info('选中二级-1');
    },
    getSelect() {
      let option = this.$refs.demo.getSelect();
      if (option == null) {
        this.$Message.info(`当前未选中`);
      } else {
        this.$Message.info(`当前选中: ${option.title}`);
      }
    },
    choose(data) {
      console.log(data);
    },
    select(data) {
      console.log(data);
    },
    open(ccc) {
      console.log(ccc);
    },

    choose1(data) {
        console.log(data);
      },
      chooseAll1() {
        this.$refs.demo1.chooseAll();
      },
      updateChoose1() {
        // 两种方法都可以
        // this.value = [11, 23, 201, 202, 203];
        this.$refs.demo1.updateChoose([1, 23, 31]);
      },
      getChoose1() {
        let options = this.$refs.demo1.getChoose();
        if (options.length == 0) {
          this.$Message.info(`当前未选中`);
        } else {
          this.$Message.info(`当前选中: ${options.length}个`);
        }
      },
      getFullChoose1() {
        let options = this.$refs.demo1.getFullChoose();
        console.log(options);
        this.$Message.info(`当前选中: ${options.length}个`);
      },
      loadDataSuccess() {
        this.$Message.success("数据加载成功");
      },
      refresh() {
        this.$refs.demo.refresh();
      }
  }
};
</script>
