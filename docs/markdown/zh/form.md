[[toc]]

# Form 表单

:::warning
非 template/render 模式下，请使用 blue-form, blue-blue-formitem。
:::

---

## 基本用法

:::demo

```html
<template>
  <div v-width="400">
    <div v-height="50">
      <blue-switchlist
        :datas="labels"
        v-model="labelPosition"
        :small="true"
      ></blue-switchlist>
    </div>
    <blue-form
      ref="form"
      :label-position="labelPosition"
      :label-width="90"
      :rules="validationRules1"
      :model="model"
    >
      <blue-formitem label="用户名" prop="name">
        <input type="text" v-model="model.name" />
      </blue-formitem>
      <blue-formitem label="密码" prop="password">
        <input type="password" v-model="model.password" />
      </blue-formitem>
      <blue-formitem>
        <blue-button color="primary" :loading="isLoading" @click="submit">
          提交</blue-button
        >&nbsp;&nbsp;&nbsp;
        <blue-button @click="reset">取消</blue-button>
      </blue-formitem>
    </blue-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isLoading: false,
        labelPosition: "left",
        labels: {
          left: "Label左对齐",
          right: "Label右对齐"
        },
        model: {
          name: "",
          password: ""
        },
        validationRules: {
          required: ["name", "password"]
        }
      };
    },
    methods: {
      submit() {
        this.isLoading = true;
        let validResult = this.$refs.form.valid();
        if (validResult.result) {
          this.$Message("验证成功");
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        } else {
          this.isLoading = false;
        }
      },
      reset() {
        this.$refs.form.reset();
      }
    }
  };
</script>
```

:::

## 三种排版以及验证

Form 组件提供四种排版方式：

block: 一行 title，一行输入
single: 一个 blue-formitem 一行
twocolumn: 两个 blue-formitem 一行
threecolumn: 三个 blue-formitem 一行
在 twocolumn 或者 threecolumn 的排列的方式下，对 blue-formitem 添加 single 参数即可列为一行，主要针对 textarea 这种不定行高的对象。

> 注意：当使用 for 循环组件的时候，一定要对 blue-formitem 添加 key，防止 blue-formitem 在同一个 parent 下没有使用 key 作为唯一值引用而产生问题。

:::demo

```html
<template>
  <div>
    <blue-form :label-width="110" :mode="mode" :model="data" :rules="validationRules" ref="blue-fm" :top="0.2" show-error-tip>
      <blue-formitem single>
        <blue-switchlist :datas="modeParam" v-model="mode" :small="true"></blue-switchlist>
      </blue-formitem>
      <blue-formitem label="Input" prop="inputData">
        <input type="text" v-model="data.inputData" placeholder="只能输入15，限制输入30个字" v-wordlimit='30' />
        <template slot="error" slot-scope="props">
          <!-- *type*: base, combine, async -->
          <span class="link" v-if="props.type == 'async'" @click="open">+++++++自定义的错误提示+++++++</span>
        </template>
      </blue-formitem>
      <blue-formitem label="Integer" prop="intData">
        <blue-slider v-model="data.intData"></blue-slider>
      </blue-formitem>
      <blue-formitem label="Integer" prop="intData">
        <blue-numberinput v-model="data.intData" :min="0" :max="100"></blue-numberinput>
      </blue-formitem>
      <blue-formitem label="Readonly" readonly>只读数据</blue-formitem>
      <blue-formitem label="Digital" prop="numberData">
        <blue-numberinput type="text" v-model="data.numberData" />
      </blue-formitem>
      <blue-formitem label="Mail" prop="emailData">
        <input type="text" v-model="data.emailData" />
      </blue-formitem>
      <blue-formitem label="URL" prop="urlData">
        <input type="text" v-model="data.urlData" />
      </blue-formitem>
      <blue-formitem label="Cellphone " prop="telData">
        <input type="text" v-model="data.telData" />
      </blue-formitem>
      <blue-formitem label="Phone" prop="mobileData">
        <input type="text" v-model="data.mobileData" />
      </blue-formitem>
      <blue-formitem label="Amount" :required="true" single>
        <div class="blue-input-group">
          <div class="blue-input-addon">
            <blue-select v-model="data.select1Data" :datas="param1" :no-border="true" :null-option="false"></Select>
          </div>
          <blue-formitem prop="money.minData" label="起始金额" :show-label="false">
            <input type="text" placeholder="起始金额" v-model="data.money.minData" />
          </blue-formitem>
          <span class="blue-input-addon">-</span>
          <blue-formitem prop="money.maxData" label="结束金额" :show-label="false">
            <input type="text" placeholder="结束金额" v-model="data.money.maxData" />
          </blue-formitem>
          <span class="blue-input-addon">K</span>
        </div>
      </blue-formitem>
      <blue-formitem label="Select" prop="select2Data">
        <blue-select  v-model="data.select2Data" dict="simple"></blue-select>
      </blue-formitem>
      <blue-formitem label="Tags" prop="taginputsData">
        <blue-taginput v-model="data.TagInputsData"></blue-taginput>
      </blue-formitem>
      <blue-formitem label="Multiple" prop="select3Data">
        <blue-select  v-model="data.select3Data" dict="simple" :multiple="true"></blue-select>
      </blue-formitem>
      <blue-formitem label="Date" ref="datapicker" prop="dateData">
        <blue-datepicker v-model="data.dateData"></blue-datepicker>
      </blue-formitem>
      <blue-formitem label="Score" prop="rateData">
        <blue-rate v-model="data.rateData" :show-text="true"></blue-rate>
      </blue-formitem>
      <blue-formitem label="Textarea" :single="true" prop="textareaData">
        <textarea rows="3" v-autosize v-wordcount="50" v-model="data.textareaData"></textarea>
      </blue-formitem>
      <blue-formitem label="Single" prop="radioData">
        <blue-radio v-model="data.radioData" :datas="dataParam"></blue-radio>
      </blue-formitem>
      <blue-formitem label="Multiple" prop="checkboxData">
        <blue-checkbox v-model="data.checkboxData" :datas="dataParam"></blue-checkbox>
      </blue-formitem>
      <blue-formitem label="Fuzzy" prop="autocompleteData">
        <blue-autocomplete v-model="data.autocompleteData" config="simple"></blue-autocomplete>
      </blue-formitem>
      <!--
          这里定义的required属性同样适用与验证规则中。
         -->
      <blue-formitem label="Custom" prop="thingsData[0]" required>
        <input type="text" v-model="data.thingsData[0]" />
      </blue-formitem>
      <blue-formitemList>
        <blue-formitem v-for="(item, index) of data.inputsData" :key="index" :label="'Custom'+(index+1)" :prop="'inputsData['+index+'].value'">
          <Row type="flex">
            <Col class="flex1">
            <input type="text" v-model="item.value" />
            </Col>
            <Col class="text-right" v-width="50">
            <Poptip @confirm="remove(index)" content="确定删除？">
              <blue-button text-color="red" :no-border="true" icon="icon-trash"></blue-button>
            </Poptip>
            </Col>
          </Row>
        </blue-formitem>
      </blue-formitemList>
      <blue-formitem :single="true" single>
        <blue-button size="s" text-color="blue" @click="add">添加输入框</blue-button>
      </blue-formitem>
      <blue-formitem :no-padding="true" single>
        <blue-button color="primary" :loading="isLoading" @click="submit" v-tooltip content="执行异步验证但是不等待结果">提交</blue-button>
        <i class="blue-split"></i>
        <blue-button color="green" :loading="isLoading" @click="submitAsync" v-tooltip content="等待所有异步验证都执行完后提交">异步提交</blue-button>
        <i class="blue-split"></i>
        <blue-button @click="reset">清除验证</blue-button>
        <blue-button @click="resetDatepicker">清除日期的验证</blue-button>
      </blue-formitem>
    </blue-form>
  </div>
</template>
<script>
export default {
  data() {
    return {

      mode: 'single',
      data: {
        intData: null,
        numberData: null,
        urlData: null,
        emailData: null,
        telData: null,
        mobileData: null,
        inputData: '',
        textareaData: '测试',
        radioData: 1,
        rateData: null,
        checkboxData: [1],
        select1Data: '人民币',
        select2Data: '',
        select3Data: [],
        taginputsData: [],
        autocompleteData: null,
        money: {
          minData: null,
          maxData: null
        },
        dateData: null,
        inputsData: [],
        thingsData: ['']
      },
      dataParam: {
        1: '男',
        2: '女',
        3: '其他'
      },
      param1: ['美金', '人民币', '卢布'],
      isLoading: false,
      modeParam: {
        single: '一个区块一行',
        twocolumn: '两列一行',
        threecolumn: '三列一行',
        block: '标题独立一行',
      },
      isInputAsyncError: false,
      validationRules: {
        rules: {
          textareaData: {
            maxLen: 50,
            minLen: 10
          },
          inputData: {
            //这里的判断不会影响最终的valid结果，所以也可以作为一些验证提示
            validAsync(value, next, parent, data) {
              console.log(value)
              setTimeout(() => {
                if (value == 15) {
                  next();
                } else {
                  next("ID不等于15");
                }
              }, 10);
            }
          }
        },
        required: [
          'autocompleteData',
          'select2Data',
          'select3Data',
          'inputsData[].value',
          'inputData',
          'radioData',
          'rateData',
          'checkboxData',
          'moneyData',
          'dateData',
          'taginputsData',
          'money.minData',
          'money.maxData',
          'intData',
          'numberData',
          'urlData',
          'emailData',
          'telData',
          'mobileData',
          'textareaData'
        ],
        int: ['intData'],
        number: ['numberData', 'money.minData', 'money.maxData'],
        url: ['urlData'],
        email: ['emailData'],
        tel: ['telData'],
        mobile: ['mobileData'],
        combineRules: [
          {
            parentRef: "money",
            refs: ['minData', 'maxData'],
            valid: {
              valid: 'lessThan',
              message: '起始金额不能大于结束金额'
            }
          }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.isLoading = true;
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$Message("验证成功");
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      } else {
        this.isLoading = false;
      }
    },
    submitAsync() {
      this.isLoading = true;
      this.$refs.form.validAsync().then(result=>{
        if (result.result) {
          this.$Message("验证成功");
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        } else {
          this.isLoading = false;
        }
      });
    },
    open() {
      this.$Modal({
        title: "处理",
        content: '我要去做特殊的处理'
      })
    },
    reset() {
      this.isLoading = false;
      this.$refs.form.reset();
    },
    resetDatepicker() {
      this.$refs.datapicker.reset();
    },
    add() {
      this.data.inputsData.push({ value: '' });
    },
    remove(index) {
      this.data.inputsData.splice(index, 1);
    }
  }
};
</script>
```

:::

### 参数设定是否必填

:::demo

```html
<template>
  <div>
    <blue-form
      :label-width="110"
      :model="data"
      ref="form"
      :rules="rules"
      :show-error-tip="showErrorTip"
    >
      <blue-formitem>
        <blue-checkbox v-model="required">是否必填</blue-checkbox>
        <i class="blue-split"></i>
        <blue-checkbox v-model="showErrorTip"
          >是否使用tip提示错误</blue-checkbox
        >
      </blue-formitem>
      <!-- 
          这里定义的required属性会应用与验证规则中，适用于一些变动性的必填项。
         -->
      <blue-formitem label="自定义数组" prop="list[0]" :required="required">
        <input type="text" v-model="data.list[0]" />
      </blue-formitem>
      <blue-formitem label="自定义规则" prop="value" :required="required">
        <input type="text" v-model="data.value" />
      </blue-formitem>
      <blue-formitem :no-padding="true">
        <blue-button color="primary" @click="submit">提交</blue-button>
        <blue-button @click="reset">清除验证</blue-button>
      </blue-formitem>
    </blue-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        required: true,
        showErrorTip: true,
        data: {
          list: [null],
          value: null
        },
        rules: {}
      };
    },
    watch: {
      required() {
        this.$refs.form.reset();
      }
    },
    methods: {
      submit() {
        let validResult = this.$refs.form.valid();
        if (validResult.result) {
          this.$Message("验证成功");
        }
      },
      reset() {
        this.$refs.form.reset();
      }
    }
  };
</script>
```

:::

### 单独调用验证方法

### 只读的表单

:::demo

```html
<template>
  <blue-form :readonly="true">
    <blue-Formitem label="姓名">{{data.name}}</blue-Formitem>
    <blue-Formitem label="年龄">{{data.age}}</blue-Formitem>
    <blue-Formitem label="学校">{{data.school}}</blue-Formitem>
    <blue-Formitem label="性别">{{data.sex}}</blue-Formitem>
  </blue-form>
</template>
<script>
  export default {
    data() {
      return {
        data: {
          name: "小王",
          age: 18,
          school: "中国某某大学",
          sex: "女"
        }
      };
    }
  };
</script>
```

:::

### 修改密码验证

### Form 参数

| 参数          | 说明                                                        | 类型    | 可选值                  | 默认值 |
| ------------- | ----------------------------------------------------------- | ------- | ----------------------- | ------ |
| mode          | 排版模式                                                    | String  | inline,single,twocolumn | single |
| model         | 关联的 model 模型，用于数据 validator。详情至 hey-validator | Object  |                         |        |
| labelWidth    | 说明文字的宽度                                              | Number  | -                       | 80     |
| readonly      | 只读的表单                                                  | Boolean | -                       | false  |
| rules         | 数据 validator 规则。详情至 hey-validator                   | Object  |                         |        |
| labelPosition | 说明文字的位置                                              | String  | left,right              | right  |
| top           | 错误的时候滑动到错误 input 的位置                           | Number  | 0-1，百分比             | 0.5    |
| topOffset     | 错误的时候滑动到错误 input 的位置的高度位移                 | Number  | -                       | 0      |
| showErrorTip  | 是否出错误的提示 Tip                                        | Boolean | -                       | false  |

### Form 方法

| 方法名                   | 说明                          |
| ------------------------ | ----------------------------- |
| valid                    | 验证整体表单                  |
| validField               | 验证个体字段                  |
| validFieldJs(prop, next) | 单纯执行验证，不触发 dom 操作 |
| reset                    | 重置验证                      |

### FormItem 参数

| 参数      | 说明                                                                                              | 类型    | 可选值 | 默认值 |
| --------- | ------------------------------------------------------------------------------------------------- | ------- | ------ | ------ |
| label     | 文字                                                                                              | String  | -      | -      |
| prop      | 关联的 model 中对应的字段，可以自动做 required 属性判断，用于数据 validator。详情至 hey-validator | Object  |        |        |
| showLabel | 是否显示 label                                                                                    | Boolean |        | false  |
| required  | 当一个 label 针对的输入比较复杂时，可以单独设置，只做必填样式的展示。                             | Boolean |        | false  |
| readonly  | 显示只读文本                                                                                      | Boolean |        | false  |
| single    | 是否为独立一行，主要是在 twocolumn 模式下使用，适用于 textarea 这种不定高度的模块。               | Boolean |        | false  |

### FormItem 方法

| 方法名 | 说明                           |
| ------ | ------------------------------ |
| reset  | reset(): 重置验证一个 FormItem |

<script>
export default {
  data() {
    return {
      required: true,
      showErrorTip: true,
      rules: {},
      isLoading: false,
      labelPosition: "left",
      labels: {
        left: "Label左对齐",
        right: "Label右对齐"
      },
      model: {
        name: "",
        password: ""
      },
      validationRules1: {
        required: ["name", "password"]
      },
      mode: 'single',
      data: {
         name: "小王",
          age: 18,
          school: "中国某某大学",
          sex: "女",
        list: [null],
        intData: null,
        numberData: null,
        urlData: null,
        emailData: null,
        telData: null,
        mobileData: null,
        inputData: '',
        textareaData: '测试',
        radioData: 1,
        rateData: null,
        checkboxData: [1],
        select1Data: '人民币',
        select2Data: '',
        select3Data: [],
        taginputsData: [],
        autocompleteData: null,
        money: {
          minData: null,
          maxData: null
        },
        dateData: null,
        inputsData: [],
        thingsData: ['']
      },
      dataParam: {
        1: '男',
        2: '女',
        3: '其他'
      },
      param1: ['美金', '人民币', '卢布'],
      isLoading: false,
      modeParam: {
        single: '一个区块一行',
        twocolumn: '两列一行',
        threecolumn: '三列一行',
        block: '标题独立一行',
      },
      isInputAsyncError: false,
      validationRules: {
        rules: {
          textareaData: {
            maxLen: 50,
            minLen: 10
          },
          inputData: {
            //这里的判断不会影响最终的valid结果，所以也可以作为一些验证提示
            validAsync(value, next, parent, data) {
              console.log(value)
              setTimeout(() => {
                if (value == 15) {
                  next();
                } else {
                  next("ID不等于15");
                }
              }, 10);
            }
          }
        },
        required: [
          'autocompleteData',
          'select2Data',
          'select3Data',
          'inputsData[].value',
          'inputData',
          'radioData',
          'rateData',
          'checkboxData',
          'moneyData',
          'dateData',
          'taginputsData',
          'money.minData',
          'money.maxData',
          'intData',
          'numberData',
          'urlData',
          'emailData',
          'telData',
          'mobileData',
          'textareaData'
        ],
        int: ['intData'],
        number: ['numberData', 'money.minData', 'money.maxData'],
        url: ['urlData'],
        email: ['emailData'],
        tel: ['telData'],
        mobile: ['mobileData'],
        combineRules: [
          {
            parentRef: "money",
            refs: ['minData', 'maxData'],
            valid: {
              valid: 'lessThan',
              message: '起始金额不能大于结束金额'
            }
          }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.isLoading = true;
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$Message("验证成功");
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      } else {
        this.isLoading = false;
      }
    },
    submitAsync() {
      this.isLoading = true;
      this.$refs.form.validAsync().then(result=>{
        if (result.result) {
          this.$Message("验证成功");
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        } else {
          this.isLoading = false;
        }
      });
    },
    open() {
      this.$Modal({
        title: "处理",
        content: '我要去做特殊的处理'
      })
    },
    reset() {
      this.isLoading = false;
      this.$refs.form.reset();
    },
    resetDatepicker() {
      this.$refs.datapicker.reset();
    },
    add() {
      this.data.inputsData.push({ value: '' });
    },
    remove(index) {
      this.data.inputsData.splice(index, 1);
    }
  }
};
</script>
