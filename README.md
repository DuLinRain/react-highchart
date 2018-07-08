# React-Highchart封装与使用方法

#### 通过dataInfo简化配置，只需配置data(数据源)、type(图类型)、xkey(x轴键)、ykeys(数值键)四个必备字段，其它可选字段同highcharts的options配置。若dataInfo配置不能满足，也可以通过options完成复杂配置，更多图形及使用示例敬请期待......


[点击这里在线查看](http://www.dulinrain.top/react-highchart/index.html)

### github地址

[https://github.com/DuLinRain/react-highchart](https://github.com/DuLinRain/react-highchart)


### 使用方法

	import {HighchartsReact} from './HighchartsReact'
	import Highcharts from 'highcharts' //依赖于Highcahrt

	const testdata = [{
	    name: '2012',
	    age: 1,
	    height: 100
	  }, {
	    name: '2013',
	    age: 2,
	    height: 200
	  }, {
	    name: '2014',
	    age: 5,
	    height: 100
	  }, {
	    name: '2015',
	    age: 8,
	    height: 170
	  }, {
	    name: '2016',
	    age: 12,
	    height: 10
	  }, {
	    name: '2017',
	    age: 19,
	    height: 230
	  }]

	
	<HighchartsReact
	    highcharts={Highcharts}
	    options={{}}
	    dataInfo={{
	      data: testdata,
	      type: 'line',
	      xkey: 'name',
	      ykeys: [{
	        key: 'age'
	      }, {
	        key: 'height'
	      }],
	      title: {
	        text: '基础折线图'
	      }
	    }}
	  />


### 更多图形示例



### 条形图

![](https://i.imgur.com/yCR071D.png)

### 面积图

![](https://i.imgur.com/vc6gg7u.png)

### 柱状图

![](https://i.imgur.com/OgzJvJO.png)

### 条形图

![](https://i.imgur.com/SCzEdRQ.png)

### 极地图

![](https://i.imgur.com/jIl9Isb.png)

### 蜘蛛图

![](https://i.imgur.com/kPPbPSv.png)