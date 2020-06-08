import axios from 'axios';

import { Todo } from '../models/todo.model';

const BASE_API_URL = process.env.BASE_API_URL || 'https://jsonplaceholder.typicode.com';

class TodoService {
  public async create(title: string): Promise<void> {
    await axios.request({
      url: `${BASE_API_URL}/todos`,
      method: 'POST',
      data: JSON.stringify({
        title,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    return;
  }

  public async getAll(): Promise<Todo[]> {
    const response = await axios.request({
      url: `${BASE_API_URL}/todos`,
      method: 'GET',
    });

    return response.data;
  }
}

export default new TodoService();
