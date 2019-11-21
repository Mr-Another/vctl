[[toc]]

## 数字转中文（大写，小写）数字，金额

> 直接使用了 [cnwhy/nzh](https://github.com/cnwhy/nzh) 项目代码，懒得每次引用，直接打包了

### 使用

```bash
import BlueUI from 'blue-ui'
const nzh = BlueUI.$nzh.cn; //简体中文  $nzh.hk繁体中文


```

### 基本示例

```javascript
nzh.encodeS(100111); // 转中文小写 >> 十万零一百一十一
nzh.encodeB(100111); // 转中文大写 >> 壹拾万零壹佰壹拾壹
nzh.encodeS("1.23456789e+21"); // 科学记数法字符串 >> 十二万三千四百五十六万万七千八百九十万亿
nzh.toMoney("100111.11"); // 转中文金额 >> 人民币壹拾万零壹佰壹拾壹元壹角壹分
```

### 自定义

```javascript
var nzh = new BlueUI.$nzh({
  ch: "〇壹贰叁肆伍陆柒捌玖", // 数字字符
  ch_u: "个十百千万亿兆京", // 数位单位字符，万以下十进制，万以上万进制，个位不能省略
  ch_f: "负", // 负字符
  ch_d: "点", // 小数点字符
  m_u: "元角分厘", // 金额单位
  m_t: "人民币", // 金额前缀
  m_z: "正" // 金额无小数后缀
});
nzh.encode("10001000000000000"); // 壹京〇壹兆
nzh.decode("壹兆"); // 1000000000000
nzh.toMoney("1.234"); // 人民币壹元贰角叁分肆厘
```

#### 方法

|  方法名              | 参数        | 说明           |
| -------------------- | ----------- | -------------- |
| encodeS(num,options) | num,options | 转中文小写     |
| encodeB(num,options) | num,options | 转中文大写     |
| toMoney(num,options) | num,options | 转中文金额     |
| decodeS(zh_num)      | num         | 中文小写转数字 |
| decodeB(zh_num)      | num         | 中文大写转数字 |

### options

| 方法名          | 名称      | 默认值 | 说明             | 示例                                                                            |
| --------------- | --------- | ------ | ---------------- | ------------------------------------------------------------------------------- |
| encodeS,encodeB | ww        | false  | 万万化开关       | `encodeS(1e16)//一万万亿` `encodeS(1e16, {ww: false})//一亿亿`                  |
| encodeS,encodeB | tenMin    | false  | 十的口语化       | `encodeS("13.5")//十三点五` `encodeS("13.5", {tenMin:false})//一十三点五`       |
| toMoney         | ww        | true   | 万万化开关       |                                                                                 |
| toMoney         | complete  | false  | 完整金额格式     | `toMoney("1")//人民币壹元整` `toMoney("1",{complete:true})//人民币壹元零角零分` |
| toMoney         | outSymbol | true   | 就否输出金额符号 | `toMoney("1")//人民币壹元整` `toMoney("1",{outSymbol:false})//壹元整`           |

<script>
import BlueUI from "@/src";
const mm = BlueUI.$mm;
const nzh = new BlueUI.$nzh(
    {
  ch: "〇壹贰叁肆伍陆柒捌玖", // 数字字符
  ch_u: "个十百千万亿兆京", // 数位单位字符，万以下十进制，万以上万进制，个位不能省略
  ch_f: "负", // 负字符
  ch_d: "点", // 小数点字符
  m_u: "元角分厘", // 金额单位
  m_t: "人民币", // 金额前缀
  m_z: "正" // 金额无小数后缀
}
);

console.log(nzh)

export default {
  data() {
    return {
      value: "",
      value2: ""
    };
  },
  mounted() {
    console.log(mm());
    this.value = mm().format();
    this.value2 =nzh.encode(122200000000221);
    console.log(this.value2);

  },
  methods: {}
};
</script>
