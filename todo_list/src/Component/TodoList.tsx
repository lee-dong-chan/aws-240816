import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getList,
  Todo as ITodo,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../lib/todoAxios";

const TodoList = (): JSX.Element => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["get", "/todo"],
    queryFn: getList,
  });

  const [todo, settodo] = useState<string>("");
  const [selectid, setselectid] = useState(0);

  const QueryClient = useQueryClient();

  const { mutate, isSuccess } = useMutation({
    mutationFn: async () => {
      await addTodo({ title: todo });
    },
  });

  const update = useCallback(async () => {
    await updateTodo({ id: selectid, title: todo });
    QueryClient.invalidateQueries({ queryKey: ["get", "/todo"] });
  }, [selectid, todo, QueryClient]);

  const deletetodo = useMutation({
    mutationFn: async (item: number) => {
      await deleteTodo({ id: item });
    },
    onSuccess() {
      QueryClient.invalidateQueries({
        queryKey: ["get", "/todo"],
      });
    },
  });

  const value = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      settodo(e.target.value);
    },
    [settodo]
  );

  const setid = useCallback(
    (id: number) => {
      setselectid(id);
    },
    [setselectid]
  );

  const clear = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      QueryClient.invalidateQueries({ queryKey: ["get", "/todo"] });
      settodo("");
    }
  }, [isSuccess, QueryClient]);

  if (isLoading) return <div>now Loading</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div>
      <h1>Todo List</h1>

      <div>
        <input type="text" value={todo} onChange={value}></input>
        <button
          onClick={() => {
            if (selectid === 0) {
              mutate();
            } else {
              update();
            }
          }}
        >
          Add Todo
        </button>
        <span onClick={clear}>선택해제</span>
      </div>
      <ul>
        {data?.map((item: ITodo, idx: number) => (
          <li key={idx}>
            <span>
              <input
                type="radio"
                name={`todo`}
                onChange={() => {
                  if (item.id) {
                    setid(item.id);
                  }
                }}
                value={selectid}
              ></input>
            </span>
            {item.title}
            <span>
              <button
                onClick={() => {
                  if (item.id) {
                    deletetodo.mutate(item.id);
                  }
                }}
              >
                삭제
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
