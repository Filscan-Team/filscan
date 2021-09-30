import Vue from 'vue'
import {
  Alert,
  Row,
  Radio,
  RadioGroup,
  Col,
  Input,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Button,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Link,
  Pagination,
  Popover,
  Loading,
  Tooltip,
  DatePicker,
  Dialog,
  Form,
  FormItem,
  Message,
  Switch,
  Select,Option,
  Checkbox,
  Menu,
  MenuItem,
  Calendar,
} from 'element-ui'
import en from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
locale.use(en)
Vue.component(Alert.name, Alert)
Vue.component(Row.name, Row)
Vue.component(Radio.name, Radio)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(Col.name, Col)
Vue.component(Input.name, Input)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Button.name, Button)
Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(BreadcrumbItem.name, BreadcrumbItem)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(Link.name, Link)
Vue.component(Pagination.name, Pagination)
Vue.component(Popover.name, Popover)
Vue.component(Tooltip.name, Tooltip)
Vue.component(DatePicker.name, DatePicker)
Vue.component(Dialog.name, Dialog)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Select.name, Select)
Vue.component(Switch.name, Switch)
Vue.component(Option.name, Option)
Vue.component(Checkbox.name, Checkbox)
Vue.component(ButtonGroup.name, ButtonGroup)
Vue.component(Menu.name, Menu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(Calendar.name, Calendar)
Vue.use(Loading)
Vue.prototype.$message = Message
