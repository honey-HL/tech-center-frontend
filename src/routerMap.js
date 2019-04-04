const Home = () => import('./pages/Home')
const Result = () => import('./pages/Search_Result/Result')
const Sharing = () => import('./pages/Master_Sharing/Sharing')
const Knowledge = () => import('./pages/Knowledge_Base/Knowledge')
const Video = () => import('./pages/Instructional_Video/Video')
const Encyclopedia = () => import('./pages/Question_Encyclopedia/Encyclopedia')



export default [
    { path: "/", name: "Home", component: Home, show: true },
    { path: "/encyclopedia", name: "encyclopedia", component: Encyclopedia,show: false },
    { path: "/video", name: "video", component: Video,show: false },
    { path: "/knowledge", name: "knowledge", component: Knowledge,show: false },
    { path: "/sharing", name: "sharing", component: Sharing,show: false },
    { path: "/result", name: "result", component: Result,show: false },
]