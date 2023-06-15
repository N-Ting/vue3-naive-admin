<template>
    <!-- value菜单当前的选中值 -->
  <n-menu :options="menuOptions" :value="activeKey" @update:value="handleMenuSelect" />
</template>

<script setup>
import { computed } from 'vue';
import { usePermissionStore, useAppStore } from '@/store'
import { renderCustomIcon,renderIcon, isExternal } from '@/utils'
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()//useRouter来手动控制路由变化
const curRoute = useRoute() //通过useRoute来接收query和param参数
const permissionStore = usePermissionStore() //权限
const appStore = useAppStore()
//sort((a,b)=>a.order - b.order)按照order进行排序a小于b，排序后的数组里a在b的前面
const menuOptions = computed(()=>{
    return permissionStore.menus.map(item=>getMenuItem(item)).sort((a,b)=>a.order - b.order)
})

const activeKey = computed(()=>curRoute.meta?.activeMenu || curRoute.name )



// 获取menu
function getMenuItem(route, basePath = '') {
    // 定义单个menu的对象
    let menuItem = {
        label:(route.meta && route.meta.title) || route.name, //有路由meta并且有title就label就等于title，或者路由的name
        key:route.name,
        path:resolvePath(basePath,route.path), //路径
        icon:getIcon(route.meta),//图标
        order: route.meta?.order || 0, //排序
    }

    //是否有子级菜单,将子级中有name并且没有isHidden的过滤出来
    const visibleChildren = route.children?route.children.filter(item=>item.name && !item.isHidden) :[]
    // 没有子级的直接返回menuItem
    if (!visibleChildren.length) return menuItem
    // 判断是否只有一个子路由
    if (visibleChildren.length===1) {
        const singRoute = visibleChildren[0]
        menuItem = {
        ...menuItem,
        label:singRoute.meta?.title || singRoute.name,
        key:singRoute.name,
        path:resolvePath(menuItem.path,singRoute.path), 
        icon:getIcon(singRoute.meta),
        order: singRoute.meta?.order || 0,
        }
        // 单个子路由下是否还有子级
        const visibleItems =  singRoute.children?singRoute.children.filter(item=>item.name && !item.isHidden) :[]
        if (visibleItems.length===1) {
            // 单个子路由处理
            menuItem = getMenuItem(visibleItems[0], menuItem.path)
        }else if(visibleItems.length>1){
            // 多个子路由
            menuItem.children = visibleItems.map(item=>getMenuItem(item,menuItem.path))
        }
    } else {
        // 多个子路由
        menuItem.children = visibleChildren
        .map((item) => getMenuItem(item, menuItem.path))
        .sort((a, b) => a.order - b.order)
        }
    return menuItem
}

//解析路径
function resolvePath(basePath, path) {
    // 判断path是否为外部链接
    if (isExternal(path)) return path
    // !!表示将变量转换为对应的布尔值，/(^\/)|(\/$)/g将前后的空格用空字符串代替
    return(
        '/' +
    [basePath, path]
      .filter((path) => !!path && path !== '/')
      .map((path) => path.replace(/(^\/)|(\/$)/g, ''))
      .join('/')
    )
}

// 获取图标
function getIcon(meta) {
    // 判断是否有customIcon
    if (meta?.customIcon) return renderCustomIcon(meta.customIcon, { size: 18 })
      // 判断是否有icon
    if (meta?.icon) return renderIcon(meta.icon, { size: 18 })
    return null
}
// 切换
function handleMenuSelect(key,item) {
    if (isExternal(item.path)) {
        window.open(item.path)
    }else{
        // 当点击的菜单没有改变时，重载当前的页面
        if (item.path===curRoute.path) {
            appStore.reloadPage()
        }else{
            // 跳转路由
            router.push(item.path)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
