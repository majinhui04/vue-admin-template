<template>
    <div class="content">
        <ul class="icon_lists dib-box">

            <li class="dib">
                <span class="icon font_family icon-dingdanguanli-moren"></span>
                <div class="name">
                    订单管理-默认
                </div>
                <div class="code-name">.icon-dingdanguanli-moren
                </div>
            </li>

            <li class="dib">
                <span class="icon font_family icon-caiwu-moren"></span>
                <div class="name">
                    财务-默认
                </div>
                <div class="code-name">.icon-caiwu-moren
                </div>
            </li>

            <li class="dib">
                <span class="icon font_family icon-caiwu-xuanzhong"></span>
                <div class="name">
                    财务-选中
                </div>
                <div class="code-name">.icon-caiwu-xuanzhong
                </div>
            </li>

            <li class="dib">
                <span class="icon font_family icon-dingdanguanli-xuanzhong"></span>
                <div class="name">
                    订单管理-选中
                </div>
                <div class="code-name">.icon-dingdanguanli-xuanzhong
                </div>
            </li>

            <li class="dib">
                <span class="icon font_family icon-quanxianguanli-moren"></span>
                <div class="name">
                    权限管理-默认
                </div>
                <div class="code-name">.icon-quanxianguanli-moren
                </div>
            </li>

            <li class="dib">
                <span class="icon font_family icon-quanxianguanli-xuanzhong"></span>
                <div class="name">
                    权限管理-选中
                </div>
                <div class="code-name">.icon-quanxianguanli-xuanzhong
                </div>
            </li>

            <li class="dib">
                <span class="icon font_family icon-tongzhidanguanli-moren"></span>
                <div class="name">
                    通知单管理-默认
                </div>
                <div class="code-name">.icon-tongzhidanguanli-moren
                </div>
            </li>

            <li class="dib">
                <span class="icon font_family icon-xiaoshouqudao-xuanzhong"></span>
                <div class="name">
                    销售渠道-选中
                </div>
                <div class="code-name">.icon-xiaoshouqudao-xuanzhong
                </div>
            </li>

            <li class="dib">
                <span class="icon font_family icon-tongzhidanguanli-xuanzhong"></span>
                <div class="name">
                    通知单管理-选中
                </div>
                <div class="code-name">.icon-tongzhidanguanli-xuanzhong
                </div>
            </li>

            <li class="dib">
                <span class="icon font_family icon-xiaoshouqudao-moren"></span>
                <div class="name">
                    销售渠道-默认
                </div>
                <div class="code-name">.icon-xiaoshouqudao-moren
                </div>
            </li>

            <li class="dib">
                <span class="icon font_family icon-shangpin-xuanzhong"></span>
                <div class="name">
                    商品-选中
                </div>
                <div class="code-name">.icon-shangpin-xuanzhong
                </div>
            </li>

            <li class="dib">
                <span class="icon font_family icon-shangpin-moren"></span>
                <div class="name">
                    商品-默认
                </div>
                <div class="code-name">.icon-shangpin-moren
                </div>
            </li>

        </ul>
    </div>
</template>
<style scoped lang="scss">
    .icon_lists {
        width: 100% !important;
        overflow: hidden;
        *zoom: 1;
        margin: 0;
        padding: 0;
    }
    .dib-box .dib {
        vertical-align: top;
        font-size: 12px;
        letter-spacing: normal;
        word-spacing: normal;
        line-height: inherit;
    }
    .icon_lists li {
        width: 100px;
        margin-bottom: 10px;
        margin-right: 20px;
        text-align: center;
        list-style: none !important;
        cursor: default;
    }
    .dib {
        display: inline-block;
        *display: inline;
        *zoom: 1;
    }
    .icon_lists .icon {
        display: block;
        height: 100px;
        line-height: 100px;
        font-size: 42px;
        margin: 10px auto;
        color: #333;
        -webkit-transition: font-size 0.25s linear, width 0.25s linear;
        -moz-transition: font-size 0.25s linear, width 0.25s linear;
        transition: font-size 0.25s linear, width 0.25s linear;
    }
    .icon_lists li .name, .icon_lists li .code-name {
        color: #666;
    }
    .icon_lists li .code-name {
        line-height: 1.2;
    }
</style>
