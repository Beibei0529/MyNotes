# 常见排序算法

**时间复杂度**

|排序方式|平均情况|最坏情况|最好情况|
|:-|:-:|:-:|:-:|
|冒泡排序|O(n²)|O(n²)|O(n)|
|选择排序|O(n²)|O(n²)|O(n²)|
|插入排序|O(n²)|O(n²)|O(n)|

## 冒泡排序

**思路**
> 从数组的第一项开始比较相邻的两项，如果要按照升序排序，前一个数大于后一个数交换位置，一轮比较下来最后一个数就是最大的，下一轮就不需要比较最后一个数了，直到数组已经排好序。

**代码**
```js
function bubbleSort (arr) {
  for(let i = 0;i < arr.length; i++) {
    let isSwap = false
    for(let j = 0;j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
        isSwap = true
      }
    }
    if (!isSwap) return arr
  }
  return arr
}
```

## 选择排序

**思路**
> 从第一项开始，选择最小的数和第一个数交换位置，再从第二项开始，选择第二项及后面中最小数和第二项交换位置，以此类推，直到循环结束。

**代码**
```js
function selectSort (arr) {
  for(let i = 0;i < arr.length - 1; i++) {
    let min = i
    for(let j = i+1;j < arr.length; j++) {
      if (arr[min] > arr[j]) {
        min = j
      }
    }
    [arr[min], arr[i]] = [arr[i], arr[min]]
  }
  return arr
}
```
## 插入排序

**思路**
> 假设前n项已经排好序，从第二项开始，跟前面的每一项比较，记录下标，碰到小于当前项的数或者循环结束，把前项插入到记录的下标位置。

**代码**
```js
function insertSort (arr) {
  for(let i = 1;i < arr.length; i++) {
    let num = i
    for(let j = i-1;j >= 0; j--) {
      if (arr[i] >= arr[j]) break
      num = j
    }
    if (num != i) {
      let temp = arr[i]
      arr.splice(i, 1)
      arr.splice(num, 0, temp)
    }
  }
  return arr
}
```
## 快速排序

## 归并排序

## 堆排序