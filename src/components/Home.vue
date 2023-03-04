<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside></Aside>
        </el-aside>
        <el-main>
          <!-- <TablePanel
            :tableData="table"
            :page="props.page"
            @reflushProps="reflushNewTable"
            :title="'员工'"
          >
          </TablePanel> -->
          <!-- <router-view></router-view> -->
          <router-view v-slot="{ Component, route }">
            <transition name="fade" mode="out-in">
              <component :is="Component" :key="route.path" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
  import { onMounted, reactive, ref } from 'vue'
  import { openWebsocketConnection } from '@/libs/websocket'
  const props = defineProps({
    page: {
      type: String,
    },
  })
  const data = reactive({
    allnotification: [],
  })
  
  const table = ref([
    {
      id: 1,
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 2,
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 3,
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 4,
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 5,
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 6,
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 7,
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 8,
      date: '2016-05-03',
      name: 'lisi',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 9,
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 10,
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 11,
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ])
  // function open(msg) {
  //   console.log(msg);
  //   switch (msg.msgtype) {
  //     case 0:
  //       break;
  //     case 1:
  //       ElNotification({
  //         title: msg.title,
  //         dangerouslyUseHTMLString: true,
  //         message: getHtmlStringMessage(msg.messageContent),
  //         offset: 50,
  //         icon: (
  //           <el-icon>
  //             <Bell />
  //           </el-icon>
  //         ),
  //       });
  //       getAllnotificationList();
  //       break;
  //     case 2:
  //       break;
  //     case 3:
  //       ElNotification({
  //         title: "提示",
  //         dangerouslyUseHTMLString: true,
  //         message: getHtmlStringMessage("欢迎使用商城后台管理系统"),
  //         offset: 50,
  //         icon: (
  //           <el-icon>
  //             <Bell />
  //           </el-icon>
  //         ),
  //       });
  //       break;
  //   }
  // }
  // //根据message的字符转换成html片段
  // function getHtmlStringMessage(str) {
  //   let arr = str.split(",");
  //   arr.forEach((item) => {
  //     item = `<storage>${item}</storage>`;
  //   });
  //   console.log(arr.join("<br>"));
  //   return arr.join("<br>");
  // }
  // //获取消息列表
  // function getAllnotificationList() {
  //   Axios.request({
  //     method: "get",
  //     url: "/auth/getnotificationlists",
  //   }).then((res) => {
  //     // storeNotification.num = res.data.num;
  //     res.data.result
  //       ? (storeNotification.allnotification = res.data.result)
  //       : "";
  //     // storeNotification.unprocessednum=(res.data.result.filter(item=>item.processed==0)).length
  //   });
  // }

  onMounted(() => {
    // getAllnotificationList();
    openWebsocketConnection()
  })
</script>

<style lang="scss">
  .el-container {
    height: 100vh;
    .el-main {
      position: relative;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
