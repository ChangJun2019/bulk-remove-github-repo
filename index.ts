import axios, { AxiosResponse } from "axios";
import config from "./config";
const chalk = require("chalk");

const log = console.log;

async function getTask(repo: string): Promise<AxiosResponse> {
  const url = config.url + repo;
  log(chalk.blue(`仓库地址：${url}`));
  return axios.delete(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${config.token}`,
      "X-OAuth-Scopes": "repo",
    },
  });
}

function requestTask() {
  const task = [];
  const repos = config.repo || [];
  if (!repos.length) {
    console.error("你没有要删除的库");
    return;
  }
  repos.forEach((repo) => {
    task.push(getTask(repo));
  });

  return task;
}

async function taskRun() {
  const allTask = requestTask();
  allTask.forEach((task) => {
    task
      .then((res) => {
        log(chalk.green("删除成功，继续删除下一个..."));
      })
      .catch((error) => {
        log(chalk.red("出错了"));
        log(chalk.red(error));
      });
  });
}

taskRun();
