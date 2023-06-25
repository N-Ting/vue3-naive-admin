

import { defineStore } from 'pinia'
import { activeTag, tags, WITHOUT_TAG_PATHS } from './helpers'
import { router } from '@/router'
import { sStorage } from '@/utils'

export const useTagsStore = defineStore('tag', {
  state() {
    return {
      tags: tags || [], //所有的tag
      activeTag: activeTag || '', //当前打开的路由tag
    }
  },
  getters: {
    activeIndex() {
      return this.tags.findIndex((item) => item.path === this.activeTag)
    },
  },
  actions: {
    // 存ActiveTag
    setActiveTag(path) {
      this.activeTag = path
      sStorage.set('activeTag', path)
    },
    // 存tags
    setTags(tags) {
      this.tags = tags
      sStorage.set('tags', tags)
    },
    // 新增的tags本地存储
    addTag(tag = {}) {
        // 新增的tags，为当前打开的
      this.setActiveTag(tag.path)
    //   判断新点击的菜单是否为WITHOUT_TAG_PATHS里的，或者已经存在tags里就return
      if (WITHOUT_TAG_PATHS.includes(tag.path) || this.tags.some((item) => item.path === tag.path))
        return
        // 存到tags里
      this.setTags([...this.tags, tag])
    },
    // 移除tag
    removeTag(path) {
      if (path === this.activeTag) {
        // 当前打开的路由下标大于0时
        if (this.activeIndex > 0) {
            // 取前一个路由
          router.push(this.tags[this.activeIndex - 1].path)
        } else {
             //当前打开的路由下标小于0时，取后一个路由
          router.push(this.tags[this.activeIndex + 1].path)
        }
      }
    //   将tag里与移除的不相同的数据过滤出来存到本地
      this.setTags(this.tags.filter((tag) => tag.path !== path))
    },
    // 移除除当前打开的路由其他路由
    removeOther(curPath = this.activeTag) {
         //   将tag里与移除的相同的数据过滤出来存到本地
      this.setTags(this.tags.filter((tag) => tag.path === curPath))
      if (curPath !== this.activeTag) {
        // 当前打开的路由不等于点击关闭其他的路由时 打开前一个路由
        router.push(this.tags[this.tags.length - 1].path)
      }
    },
    // 移除当前点击关闭左侧路由的左侧tag
    removeLeft(curPath) {
        // 找到item.path === curPath的下标
      const curIndex = this.tags.findIndex((item) => item.path === curPath)
       //   将下标大于的过滤出来
      const filterTags = this.tags.filter((item, index) => index >= curIndex)
      this.setTags(filterTags)
      /* find返回满足条件的第一个元素，则返回undefined
      !filterTags.find((item) => item.path === this.activeTag) 
      这里表示当前显示的路由为删除的路由时，则显示最后一个路由页面
       */
      if (!filterTags.find((item) => item.path === this.activeTag)) {
        router.push(filterTags[filterTags.length - 1].path)
      }
    },
    // 移除当前点击关闭右侧路由的tag
    removeRight(curPath) {
      const curIndex = this.tags.findIndex((item) => item.path === curPath)
      const filterTags = this.tags.filter((item, index) => index <= curIndex)
      this.setTags(filterTags)
      if (!filterTags.find((item) => item.path === this.activeTag)) {
        router.push(filterTags[filterTags.length - 1].path)
      }
    },
    // 重置tags
    resetTags() {
      this.setTags([])
      this.setActiveTag('')
    },
  },
})
