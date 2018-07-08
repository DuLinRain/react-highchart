import React, { PureComponent } from 'react';
const noDataHelper = require('highcharts/modules/no-data-to-display')
const moreHelper = require('highcharts/highcharts-more')
const toStringHelper = Object.prototype.toString
function isArray (obj) {
    return Array.isArray(obj)
}
function isObject (obj) {
    return toStringHelper.call(obj) === '[object Object]'
}
function normanizeChartType (type = 'line') {
    let t = 1
    switch (type) {
        case 'pie':
            t = 0 //表示 pie
        break
        case 'line':
        case 'bar':
        case 'column':
        case 'area':
        case 'areaspline':
        case 'arearange':
        case 'spline':
        case 'streamgraph':
        case 'columnrange':
        case 'polar':
            t = 1 //表示 普通图
        break
        default:
            t = 1

    }
    return t
}
function defaultConfig (H) {
    let protocol = window.location.protocol
    let defaultOptionsZhCn = {
        lang: {
            contextButtonTitle: '图表导出菜单',
            decimalPoint: '.',
            downloadJPEG: '下载JPEG图片',
            downloadPDF: '下载PDF文件',
            downloadPNG: '下载PNG文件',
            downloadSVG: '下载SVG文件',
            drillUpText: '返回 {series.name}',
            invalidDate: '无效的时间',
            loading: '加载中...',
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            noData: '暂无数据',
            numericSymbols: ['w'],
            numericSymbolMagnitude: 10000,
            printChart: '打印图表',
            resetZoom: '重置缩放比例',
            resetZoomTitle: '重置为原始大小',
            shortMonths: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            thousandsSep: ',',
            weekdays: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
            rangeSelectorFrom: '开始时间',
            rangeSelectorTo: '结束时间',
            rangeSelectorZoom: '缩放',
            zoomIn: '缩小',
            zoomOut: '放大'
        },
        global: {
            useUTC: true,
            canvasToolsURL: protocol + '//cdn.hcharts.cn/highcharts/modules/canvas-tools.js',
            VMLRadialGradientURL: protocol + '//cdn.hcharts.cn/highcharts/gfx/vml-radial-gradient.png'
        },
        title: {
            text: '', // 默认不带标题
            useHTML: true// 默认支持HTML
        },
        subtitle: {
            text: '', // 默认不带标题
            useHTML: true
        },
        tooltip: {
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            },
            backgroundColor: {
                linearGradient: [0, 0, 0, 60],
                stops: [
                    [0, '#FFFFFF'],
                    [1, '#FAFAFA']
                ]
            },
            borderWidth: 1,
            borderColor: '#AAA',
            hideDelay: 50,
            shared: true
        },
        colors: ['#058DC7', '#E1DAE8', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
        exporting: {
            enabled: false
        },
        credits: {
            text: 'DuLinRain',
            href: 'https://www.dulinrain.top',
            enabled: false
        },
        xAxis: {
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%Y-%m-%d',
                week: '%b-%e',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        yAxis: {
            title: {
                text: '' // 默认y轴不带标题
            }
        },
        plotOptions: {
            series: {
                fillOpacity: 0.5
            }
        }
    }
    H.setOptions(defaultOptionsZhCn)
    return H
}
function transformData (dataInfo = {}) {
    let {data = [], type = 'line', xkey, ykeys = [], ...chartConfig} = dataInfo
    let normalizedType = normanizeChartType(type)
    if (normalizedType === 0) {

    } else if (normalizedType === 1) {
        let xData = [], yData = []
        ykeys = isArray(ykeys) ? ykeys
            : (isObject(ykeys) && ykeys.key === void 0) ? []
                : [ykeys]
        xData = data.map((item = {}) => {
            return item[xkey]
        })
        yData = ykeys.map(({key, name = key, ...others}) => {
            let tempdata = data.map((item) => {
                return item[key]
            })
            return {
                ...others,
                name,
                data: tempdata
            }
        })
        let chart = {}, yAxisConfig = {}, xAxisConfig = {
            xAxis: {
                categories: xData
            }
        }
        if (type === 'polar') {
            chart.polar = true
        } else if (type=== 'spider') {
            chart.polar = true
            yAxisConfig = {
                yAxis: {
                    gridLineInterpolation: 'polygon'
                }
            }
            xAxisConfig.xAxis.lineWidth = 0
        } else {
            chart.type = type
        }
        return {
            ...xAxisConfig,
            ...yAxisConfig,
            series: yData,
            chart,
            ...chartConfig
        }
    }
}
export class HighchartsReact extends PureComponent {
    constructor (props) {
        super(props)
        this.container = null
        this.chartIns = null
    }
    componentDidMount = () => {
        let _ = this
        let {highcharts = window.Highcharts, constructorType = 'chart', options = {}, dataInfo} = _.props
        noDataHelper(highcharts)
        moreHelper(highcharts)
        defaultConfig(highcharts)
        if (dataInfo !== void 0) {
            options = transformData(dataInfo)
        }
        console.log(options)
        _.chartIns = highcharts[constructorType](_.container, options)
    }
    componentWillUnmount = () => {
        this.chartIns.destroy()
    }
    componentDidUpdate = () => {
        let _ = this
        let {options = {}, oneToOne = true}  = _.props
        _.chartIns.update(options, oneToOne)
    }
    componentWillReceiveProps = () => {
        let _ = this
        let {options = {}, oneToOne = true}  = _.props
        _.chartIns.update(options, oneToOne)
    }
    bindRef = (container) => {
        this.container = container
    }
    render () {
        let _  = this
        return (
            <div ref={_.bindRef}></div>
        )
    }
}

