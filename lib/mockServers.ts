export type ServerItem = {
  id: string;
  domain: string;
  rate: string;
  chronicle: string;
  dateTime: string; 
  displayDate: string;
  topserver?: boolean;
  serverColor?: boolean;
  icons?: ("gift" | "verified" | "donate")[];
};

export const soonServers: ServerItem[] = [
  {
    id: "undeadmu-pro-soon",
    domain: "UNDEADMU.PRO",
    rate: "x100",
    chronicle: "High Five",
    dateTime: "2025-09-01",
    displayDate: "19.09.25",
    topserver: true,
    icons: ["gift", "verified", "donate"],
  },
  {
    id: "ketrawars-net-soon-1",
    domain: "KETRAWARS.NET",
    rate: "x1",
    chronicle: "High Five",
    dateTime: "2025-09-01",
    displayDate: "19.09.25",
    serverColor: true,
    icons: [],
  },
  {
    id: "lineagers-net-soon",
    domain: "LINEAGERS.NET",
    rate: "x100",
    chronicle: "Essence",
    dateTime: "2025-09-02",
    displayDate: "Сегодня",
    serverColor: true,
    icons: ["gift", "verified", "donate"],
  },
  {
    id: "elmorelab-com-soon",
    domain: "ELMORELAB.COM",
    rate: "GVE",
    chronicle: "High Five",
    dateTime: "2025-09-03",
    displayDate: "Завтра",
    serverColor: true
  },
  {
    id: "ketrawars-net-soon-2",
    domain: "KETRAWARS.NET",
    rate: "x100",
    chronicle: "High Five",
    dateTime: "2025-09-02",
    displayDate: "19.09.25",
    icons: ["gift", "verified"],
  },
  {
    id: "valhalla-age-soon",
    domain: "VALHALLA-AGE",
    rate: "x50k",
    chronicle: "High Five",
    dateTime: "2025-09-01",
    displayDate: "19.09.25",
    icons: ["gift", "donate"],
  }
];

export const openedServers: ServerItem[] = [
  {
    id: "undeadmu-pro-open-1",
    domain: "UNDEADMU.PRO",
    rate: "x100",
    chronicle: "High Five",
    dateTime: "2025-09-02",
    displayDate: "19.09.25",
    topserver: true,
    icons: ["gift", "verified", "donate"],
  },
  {
    id: "undeadmu-pro-open-2",
    domain: "UNDEADMU.PRO",
    rate: "x100",
    chronicle: "High Five",
    dateTime: "2025-09-03",
    displayDate: "Вчера",
    serverColor: true,
    icons: ["gift", "verified", "donate"],
  },
  {
    id: "l2essence-online-open",
    domain: "L2ESSENCE.ONLINE",
    rate: "x100",
    chronicle: "High Five",
    dateTime: "2025-09-02",
    displayDate: "19.09.25",
    serverColor: true,
    icons: ["gift", "donate"],
  },
  {
    id: "dinasty-club-open",
    domain: "DINASTY.CLUB",
    rate: "x100",
    chronicle: "High Five",
    dateTime: "2025-08-31",
    displayDate: "19.09.25",
    serverColor: true,
    icons: ["donate"],
  },
  {
    id: "moon-land-com-open",
    domain: "MOON-LAND.COM",
    rate: "x100k",
    chronicle: "High Five",
    dateTime: "2025-09-02",
    displayDate: "19.09.25",
    icons: ["gift", "verified"],
  },
  {
    id: "destorus-com-open",
    domain: "DESTORUS.COM",
    rate: "x100k",
    chronicle: "High Five",
    dateTime: "2025-09-04",
    displayDate: "19.09.25",
    icons: ["verified", "donate"],
  },
];

export const todayServers: ServerItem[] = [
  {
    id: "undeadmu-pro-soon",
    domain: "UNDEADMU.PRO",
    rate: "x100",
    chronicle: "High Five",
    dateTime: "2025-09-03",
    displayDate: "19.09.25",
    topserver: true,
    icons: ["gift", "verified", "donate"],
  },
  {
    id: "ketrawars-net-soon-1",
    domain: "KETRAWARS.NET",
    rate: "x1",
    chronicle: "High Five",
    dateTime: "2025-09-01",
    displayDate: "19.09.25",
    serverColor: true,
    icons: ["gift", "verified", "donate"],
  },
  {
    id: "lineagers-net-soon",
    domain: "LINEAGERS.NET",
    rate: "x100",
    chronicle: "Essence",
    dateTime: "2025-09-02",
    displayDate: "Сегодня",
    icons: ["gift", "donate"],
  },
  {
    id: "elmorelab-com-soon",
    domain: "ELMORELAB.COM",
    rate: "GVE",
    chronicle: "High Five",
    dateTime: "2025-09-04",
    displayDate: "Завтра",
    icons: ["gift", "verified", "donate"],
  },
];
export const tomorrowServers: ServerItem[] = [
  {
    id: "undeadmu-pro-soon",
    domain: "UNDEADMU.PRO",
    rate: "x100",
    chronicle: "High Five",
    dateTime: "2025-09-03",
    displayDate: "19.09.25",
    topserver: true,
    icons: [ "donate"],
  },
  {
    id: "ketrawars-net-soon-1",
    domain: "KETRAWARS.NET",
    rate: "x1",
    chronicle: "High Five",
    dateTime: "2025-09-02",
    displayDate: "19.09.25",
    serverColor: true,
    icons: ["gift", "verified", "donate"],
  },
  {
    id: "lineagers-net-soon",
    domain: "LINEAGERS.NET",
    rate: "x100",
    chronicle: "Essence",
    dateTime: "2025-09-01",
    displayDate: "Сегодня",
    icons: ["gift", "verified", "donate"],
  },
  {
    id: "elmorelab-com-soon",
    domain: "ELMORELAB.COM",
    rate: "GVE",
    chronicle: "High Five",
    dateTime: "2025-09-20",
    displayDate: "Завтра",
    icons: ["gift", "verified", "donate"],
  },
];


