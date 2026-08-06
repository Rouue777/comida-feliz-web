export interface DashboardSummary {
  ordersToday: number;
  revenueToday: number;
  preparing: number;
  ready: number;
  delivery: number;
}

export type DashboardSummaryDaily = {

    ordersToday: number;

    averageTicket: number;

    lastOrderTime: string;

    deliveryOrders: number;

    dineInOrders: number;

    cancelledOrders: number;

};