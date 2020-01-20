import axios from "axios";
import {testsUrl, userUrl} from './Routes'

const get = url =>
    new Promise(((resolve, reject) => {
        axios.get(url)
            .then(response => {
                if (response.status === 200) {
                    resolve(response.data)
                } else {
                    reject(response)
                }
            })
    }));
const getAll = url =>
    new Promise(((resolve, reject) => {
        axios.get(url)
            .then(response => {
                if (response.status === 200) {
                    resolve(response.data)
                } else {
                    reject(response)
                }
            })
    }));

const post = (url, body) =>
    new Promise(((resolve, reject) => {
        axios.post(url, body)
            .then(response => {
                if (response.status === 201 || response.status === 200) {
                    resolve(response.data);
                } else {
                    alert("Something went wrong")
                    reject(response)
                }
            })
    }));

const put = (url, body) =>
    new Promise(((resolve, reject) => {
        axios.put(url, body)
            .then(response => {
                console.log(response.status)
                if (response.status === 200 || response.status === 204) {
                    // alert("działa")
                    resolve(response.data.data) // put nie powinien zwracac body w response i status no content(204) a nie ok (200)
                } else {
                    alert("Something went wrong")
                    reject(response)
                }
            })
    }));
const del = url =>
    new Promise(((resolve, reject) => {
        axios.delete(url)
            .then(response => {
                console.log(response);
                if (response.status === 200 || response.status === 204) {
                    resolve(response.data)
                } else {
                    reject(response)
                }
            })
    }));

export const saveTest = body => post(testsUrl(), body);
export const confirmUser = body => post(userUrl(), body);

export const deleteUser = param => del(userUrl() + `?userName=${param}`);


export const getUsers = () => getAll(userUrl());