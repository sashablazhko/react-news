import { OrderedMap, Map } from "immutable";

export function arrToMap(arr, key = "_id", DataRecord = Map) {
  return arr.reduce((acc, item) => acc.set(item[key], new DataRecord(item)), new OrderedMap({}));
}

export function mapToArr(obj) {
  return obj.valueSeq().toArray();
}

export function truncateString(str) {
  return str.substring(0, 200) + "...";
}
