import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// 导入 Vant 组件库
import {
  Button,
  NavBar,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Card,
  Tag,
  Tab,
  Tabs,
  Search,
  Sidebar,
  SidebarItem,
  Stepper,
  Checkbox,
  CheckboxGroup,
  Empty,
  Loading,
  ActionSheet,
  Dialog,
  Toast,
  Form,
  Field,
  CellGroup,
  AddressEdit,
  AddressList,
  SwipeCell,
  ActionBar,
  ActionBarIcon,
  ActionBarButton
} from 'vant'

// 导入 Vant 样式
import 'vant/lib/index.css'

// 导入全局样式
import './styles/variables.scss'
import './styles/global.scss'

const app = createApp(App)

// 注册 Vant 组件
const vantComponents = [
  Button,
  NavBar,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Card,
  Tag,
  Tab,
  Tabs,
  Search,
  Sidebar,
  SidebarItem,
  Stepper,
  Checkbox,
  CheckboxGroup,
  Empty,
  Loading,
  ActionSheet,
  Dialog,
  Toast,
  Form,
  Field,
  CellGroup,
  AddressEdit,
  AddressList,
  SwipeCell,
  ActionBar,
  ActionBarIcon,
  ActionBarButton
]

vantComponents.forEach(component => {
  app.use(component)
})

app.use(createPinia())
app.use(router)

app.mount('#app')
