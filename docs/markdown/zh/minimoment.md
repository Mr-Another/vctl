[[toc]]

# miniMoment 简称 mm

moment 太大，搞个简洁的日期处理工具，比 moment.js 小很多。

## 使用

```
### 引用方式
import BlueUI from 'blue-ui'
const mm = BlueUI.$mm();
mm.format();


### 组件内部使用
this.$mm().format();
```

## 配置

### 定义简洁的格式化

```javascript
mm.config({
  formatString: {
    r: "YYYY"
  }
});

mm().format("r"); // 2017
```

### 设定当前时间

设置前端与后端的时间差，这样前端也可以使用 mm()获取当前时间。

```javascript
mm.config({
  now: "2016-07-11T18:42:34.453+08:00"
});

mm().format(); // 2016-07-11
```

## 基本使用

初始化使用，支持各种类型，

`mm(String|Number|Date|Array|mm)`

```javascript
let now = mm(); // 定义当前时间的mm对象
let sevenDay = now.clone().add(7, mm.DAY); //定义七天后的日期
let twoDay = mm(now).add(2, mm.DAY); //定义两天后的日期
let month = now.startOf(mm.MONTH); //定义月初的日期

mm(1459235037000).format(); //毫秒 2016-03-29
mm([2016, 12, 23, 4, 3, 5]).format("f");
//月份自动补充，执行：new Date(2016,11,23,4,3,5) 2016-12-23 04:03:05
mm([2015, 12, 3]).format("f");
//执行：new Date(2015,11,3) 2015-12-03
mm("2014-12-03").format("f"); //2014-12-03 00:00:00
mm("2014-12-03 12:34").format("f"); //2014-12-03 12:34:00
mm("2014-12-03 12:34:12").format("f"); //2014-12-03 12:34:34
mm("20141203", "YYYYMMDD").format("f"); //2014-12-03 00:00:00
mm("201412031223", "YYYYMMDDHHmm").format("f"); //2014-12-03 12:23:00
```

## get

`month()`方法，对月份做了修补。

```javascript
mm().year(); //2016
mm()
  .year(2018)
  .format(); //2018-03-29
mm().month(); //2016-03-29
mm()
  .month(4)
  .format(); //2016-04-29
mm().minutes(); //59
mm().minutes(34);
mm().time(); //1459242450800
mm()
  .time(123131312321)
  .format(); //1973-11-26
mm().date(); //29
mm()
  .date(4)
  .format(); //2016-03-04
```

## 格式化

### 格式化日期转换标准

- YYYY/yyyy:年份
- M:月份
- MM:月份，个位补充 0
- D/d:天数
- DD/dd:天数，个位补充 0
- H/h:小时
- HH/hh:小时，个位补充 0
- m:分钟
- mm:分钟，个位补充 0
- S/s:秒数
- SS/ss:秒数，个位补充 0
- w:星期，返回中文：['日', '一', '二', '三', '四', '五', '六']
- q:上下午，返回中文：['上午', '下午']

### 简洁的格式化

- "l": "YYYY-MM-DD",
- "ll": "YYYY 年 MM 月 DD 日",
- "k": "YYYY-MM-DD hh:mm",
- "kk": "YYYY 年 MM 月 DD 日 hh 点 mm 分",
- "kkk": "YYYY 年 MM 月 DD 日 hh 点 mm 分 q",
- "f": "YYYY-MM-DD hh:mm:ss",
- "ff": "YYYY 年 MM 月 DD 日 hh 点 mm 分 ss 秒",
- "fff": "YYYY 年 MM 月 DD 日 hh 点 mm 分 ss 秒 星期 w",
- "n": "MM-DD",
- "nn": "MM 月 DD 日",

```javascript
//各种format
mm(); // Tue Mar 29 2016 16:52:56 GMT+0800 (CST)
mm().toString(); // Tue Mar 29 2016 16:52:56 GMT+0800 (CST)
mm().format(); // 2016-03-29
mm().format("l"); // 2016-03-29
mm().format("ll"); // 2016年03月29日
mm().format("k"); // 2016-03-29 16:52
mm().format("kk"); // 2016年03月29日 16点52分
mm().format("kkk"); // 2016年03月29日 16点52分 下午
mm().format("f"); // 2016-03-29 16:52:56
mm().format("ff"); // 2016年03月29日 16点52分56秒
mm().format("fff"); // 2016年03月29日 16点52分56秒 星期二
mm().format("n"); // 03-29
mm().format("nn"); // 03月29日
mm().format("YYYY"); // 2016
```

## toString

`toString()`方法，输出本地的日期格式。

```javascript
mm().toString();
```

## isLeapYear

`isLeapYear()`方法，判断是否为闰年。

```javascript
mm().isLeapYear(); //是否为闰年 true
```

## clone

`clone()`方法，可以复制一个 mm 对象。

```javascript
mm().clone(); //复制mm对象，
```

## ISOString

`toISOString()`方法，获取带时区的格式化字符串(例：2016-12-02T20:58:02+08:00)。
可传递参数获取其他时区的格式化字符串。

```javascript
mm("2016-07-23 12:12:12").toISOString(); //返回带时区的格式，2016-07-23T12:12:12+08:00
mm("2016-07-23 12:12:12").toISOString(+7); //返回UTC+7的日期，2016-07-23T11:12:12+07:00
```

## distance

`mm.distance(mm|String|Number|Date|Array,mm.TYPE)`

```javascript
mm("2012-09-21").distance("2012-09-20 23:59:59");
//两个日期间相隔天数，纠正日期计算偏差 1

mm("2012-09-21").distance("2012-09-20 23:59:59", mm.DAY);
//两个日期间相隔天数 1

mm("2012-09-21").distance("2012-08-20 23:59:59", mm.MONTH);
//两个日期间相隔月数 1

mm("2012-09-21").distance("2011-09-20 23:59:59", mm.YEAR);
//两个日期间相隔年数 1

mm("2017-07-01").distance(mm("2017-08-06"), mm.WEEK, mm.SUNDAY);
//两个日期间相隔星期数 -6

mm("2017-08-10").distance(mm("2017-08-06"), mm.WEEK, mm.SUNDAY);
//两个日期间相隔星期数 0

mm("2017-08-10").distance(mm("2017-08-06"), mm.WEEK, mm.MONDAY);
//两个日期间相隔星期数 1

mm("2016-07-23").distance(mm("2015-07-23"), mm.MINUTE);
//两个日期间相隔分钟 527040

mm("2016-07-23").distance(mm("2015-07-23"), mm.HOUR);
//两个日期间相隔小时数 8784
```

## add

`add`方法，对日期做加减法，只有 add 函数，如果需要减法，则传递负数。
`mm.add(Number,mm.TYPE)`

```javascript
mm("2012-10-03 23:59:59")
  .add(1, mm.DAY)
  .format("fff");
//2012年10月04日 23点59分59秒 星期四

mm("2012-10-03 23:59:59")
  .add(-1, mm.DAY)
  .format("fff");
//2012年10月02日 23点59分59秒 星期二

mm("2012-10-03 23:59:59")
  .add(26, mm.MONTH)
  .format("fff");
//2014年12月03日 23点59分59秒 星期三

mm("2012-10-03 23:59:59")
  .add(-1, mm.YEAR)
  .format("fff");
//2011年10月03日 23点59分59秒 星期一

mm("2012-10-03 23:59:59")
  .add(1, mm.MINUTE)
  .format("ff");
//2012年10月04日 00点00分59秒
```

## startOf

`startOf`方法，做一定规则的时间处理，并返回结果。
注：该处理并不修改原来的对象，请使用返回的对象处理。  
`mm.startOf(mm.TYPE)`

```javascript
mm("2012-10-03 23:59:59")
  .startOf(mm.DAY)
  .format("fff");
//2012年10月03日 00点00分00秒 星期三

mm("2012-10-03 23:59:59")
  .startOf(mm.YEAR)
  .format("fff");
//2012年01月01日 00点00分00秒 星期日

mm("2012-10-03 23:59:59")
  .startOf(mm.MONTH)
  .format("fff");
//2012年10月01日 00点00分00秒 星期一

mm("2012-10-03 23:59:59")
  .startOf(mm.HOUR)
  .format("fff");
//2012年10月03日 15点00分00秒 星期三

mm("2012-10-03 23:59:59")
  .startOf(mm.WEEK)
  .format("fff");
//2012年09月30日 00点00分00秒 星期日

mm("2012-10-03 23:59:59")
  .startOf(mm.WEEK, mm.MONDAY)
  .format("fff");
//2012年10月01日 00点00分00秒 星期一

mm("2016-07-23 12:12:12")
  .startOf(mm.QUARTER)
  .format("f");
//2016-07-01 00:00:00
```

## endOf

`endOf`方法，做一定规则的时间处理，并返回结果。
注：该处理并不修改原来的对象，请使用返回的对象处理。  
`mm.endOf(mm.TYPE)`

```javascript
mm("2012-10-03 23:59:59")
  .endOf(mm.DAY)
  .format("ff");
//2012年10月03日 23点59分59秒

mm("2012-10-03 23:59:59")
  .endOf(mm.YEAR)
  .format();
//2012-12-31

mm("2012-10-03 23:59:59")
  .endOf(mm.MONTH)
  .format();
//2012-10-31

mm("2012-10-03 23:59:59")
  .endOf(mm.WEEK)
  .format("fff");
//2012年10月06日 23点59分59秒 星期六

mm("2012-10-03 23:59:59")
  .endOf(mm.WEEK, mm.MONDAY)
  .format("fff");
//2012年10月07日 23点59分59秒 星期日

mm("2016-07-23 12:12:12")
  .endOf(mm.QUARTER)
  .format("f");
//2016-09-30 23:59:59
```

## week

```javascript
//获取当月的星期数
//mm.SUNDAY 星期日开始
//默认星期日
mm().getWeekOfMonth();
mm().getWeekOfMonth(mm.MONDAY);

//获取当年的星期数
//mm.MONDAY 星期一开始
mm().getWeekOfYear(mm.MONDAY);
```
