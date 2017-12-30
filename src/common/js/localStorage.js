/**
 * @file
 * @author tanruiqi@foxmail.com
 */

export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItem(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : false;
}
