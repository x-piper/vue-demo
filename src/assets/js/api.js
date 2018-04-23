// const host = "http://172.16.0.147:8080/CrmIntelligence/";
import { host } from './host'
export default {
  "host": host,
  "static": "http://localhost:8021/static", //  本地静态资源
  "login": host + 'login', //  登录认证
  "logout": host + 'logout', // 退出
  "bht": host + 'bht', //品牌健康度数据
  "getL2CatList": host + 'bht/getL2CatList', //返回雀巢二级类目列表
  "getSubdivisionCat": host + 'bht/getSubdivisionCat', //返回自定义类目列表
  "getL2CatAipl": host + 'bht/getL2CatAipl', //获取二级类目的AIPL总体数据
  "getL2CatConversion": host + 'bht/getL2CatConversion', //获取二级类目各状态流转率
  "getSourceOfAwareness": host + 'bht/getSourceOfAwareness', //获取触点分布
  "getOverlapRatio": host + 'bht/getOverlapRatio', //获取触点重合率
  "getConsumerTrcking": host + 'bht/getConsumerTrcking', //消费者跟踪
  "getSubCatIpl": host + 'bht/getSubCatIpl', //获取细分类目的IPL总体数据
  "getSubCatConversion": host + 'bht/getSubCatConversion', //获取细分类目的IPL总体数据
  "updatedateBHT": host + 'bht/updatedate', //获取bht更新时间
  "salesChannel": host + 'salesChannel', //销售趋势
  "channelanalyze": host + 'channelanalyze', //渠道分析
  "goodsAttr": host + 'importExcel/goodsAttr', //导入商品自定义属性
  "bhtData" : host + 'importExcel/bhtData',//, //导入品牌健康度数据
  "alipay" : host + 'alipay/createAliOrder',//, //导入品牌健康度数据
}