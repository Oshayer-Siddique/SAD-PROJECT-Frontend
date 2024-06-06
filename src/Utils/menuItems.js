import { circle, sales, transactions } from "./icons"
import { trend } from "./icons"
import { expenses } from "./icons"
import { dashboard } from "./icons"



export const menuItems = [
    {
        id: 1,
        title : 'Dashboard',
        icon: transactions,
        link: '/dashboard',
    },
    {
        id: 2,
        title: "Analyze",
        icon: dashboard,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Income",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Expense",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 5,
        title: "Sales",
        icon: sales,
        link: "/dashboard",
    },

] 