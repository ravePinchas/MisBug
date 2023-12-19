
import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true
})

import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

// const STORAGE_KEY = 'bugDB'
const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/' :
    '//localhost:3030/api/bug/'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getEmptyBug,
    getDefaultFilter,
}


async function query(filterBy = {}) {
    console.log('filterBy: ', filterBy)
    var { data: bugs } = await axios.get(BASE_URL, {params: filterBy});
    console.log(bugs)
    return bugs
}
async function getById(bugId) {
    const url = BASE_URL + bugId
    var { data: bug } = await axios.get(url)
    return bug
}
async function remove(bugId) {
    const url = BASE_URL + bugId
    var { data: res } = await axios.delete(url)
    return res
}
async function save(bug) {
    // const queryParams = `?_id=${bug._id || ''}&title=${bug.title}&severity:${bug.severity}`
    // const url = BASE_URL + 'save/' + queryParams

    console.log('bug: ', bug);
    const method = bug._id ? 'put' : 'post'
    const {data: savedBug} = await axios[method](BASE_URL, bug) //bug go to req.body
    return savedBug
}

function getEmptyBug(title = '', severity = '') {
    return { title, severity }
}

function getDefaultFilter() {
    return { text: '', severity: 0, pageIdx: null }
}