/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface EpisodeItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: {
    link: string
    type: string
    length: number
    duration: number
    rating: { scheme: string; value: string }
  }
  categories: string[]
}

export interface ApiFeedResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: EpisodeItem[]
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

export interface Datum {
  flight_date:   Date;
  flight_status: string;
  departure:     Arrival;
  arrival:       Arrival;
  airline:       Airline;
  flight:        Flight;
  aircraft:      null;
  live:          null;
}


export interface Airline {
  name: string;
  iata: string;
  icao: string;
}

export interface Arrival {
  airport:          string;
  timezone:         string;
  iata:             string;
  icao:             string;
  terminal:         string;
  gate:             null | string;
  baggage?:         null;
  delay:            number | null;
  scheduled:        Date;
  estimated:        Date;
  actual:           Date | null;
  estimated_runway: Date | null;
  actual_runway:    Date | null;
}

export interface Flight {
  number:     string;
  iata:       string;
  icao:       string;
  codeshared: null;
}

export interface Pagination {
  limit:  number;
  offset: number;
  count:  number;
  total:  number;
}

export interface ApiFlightDetailResponse {
  pagination: Pagination,
  data: Datum[]
}
