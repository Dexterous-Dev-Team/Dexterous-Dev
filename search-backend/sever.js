// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // 允许跨域请求

// 模拟的搜索数据
const data = [
    { id: 1, title: '如何使用 Node.js 开发后端', introduction: 'Node.js 是一个开源的服务器端 JavaScript 运行时环境...' },
    { id: 2, title: 'JavaScript 的最新特性', introduction: 'JavaScript 不断发展，最近的 ECMAScript 标准带来了很多新特性...' },
    { id: 3, title: '使用 Express 框架构建 API', introduction: 'Express 是一个灵活且广泛使用的 Node.js 框架，用于构建 Web 应用...' },
    { id: 4, title: '前端开发的最佳实践', introduction: '前端开发涉及多个方面，包括响应式设计、性能优化等...' },
    { id: 5, title: 'hello my world', introduction: '这是一个简单的测试内容...' }
];

// 搜索接口
const Fuse = require('fuse.js');

app.get('/search', (req, res) => {
    const query = req.query.q || '';

    // Define options for Fuse.js
    const options = {
        includeScore: true,
        keys: ['title'], // Specify which fields to search
        threshold: 0.5 // Adjust the threshold to control the fuzziness
    };

    // Initialize Fuse with data and options
    const fuse = new Fuse(data, options);

    // Perform search
    const results = fuse.search(query).map(result => result.item);

    res.json(results);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
