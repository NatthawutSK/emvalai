"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskSelector, addTask } from "@/redux/slices/TaskSlice";
import { useAppDispatch } from "@/redux/store";
import { TaskStateEnum } from "@/types";
import { useState } from "react";
import { BiTask } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { ComboBoxAssignee } from "./ComboBoxAssignee";
import { CalendarClock } from "lucide-react";
import { DueDateTask } from "./DueDateTask";
import { Textarea } from "./ui/textarea";
import { DateRange } from "react-day-picker";
import { useSelector } from "react-redux";
type Props = {
  state: TaskStateEnum;
};

export default function DialogAddTask({ state }: Props) {
  const dispatch = useAppDispatch();
  const taskReducer = useSelector(TaskSelector);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const [desc, setDesc] = useState("");
  const [assignee, setAssignee] = useState("");
  const addDate = (date: DateRange) => {
    setDate(date);
  };
  const addAssignee = (value: string) => {
    setAssignee(value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">ADD</Button>
      </DialogTrigger>
      <DialogContent className=" max-w-[35rem] h-[30rem]">
        <div>
          <DialogHeader className="mb-6">
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>
          <div className=" flex justify-between items-center mb-3">
            <span className="flex gap-1 items-center">
              <BiTask size={30} />
              <Label htmlFor="title">Task</Label>
            </span>
            <Input
              className="w-[300px]"
              id="title"
              placeholder="new Task..."
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className=" flex justify-between items-center mb-3">
            <span className="flex gap-1 items-center">
              <BsPeopleFill size={30} />
              <Label htmlFor="title">assignee</Label>
            </span>
            <ComboBoxAssignee assignee={assignee} addAssignee={addAssignee} />
          </div>
          <div className=" flex justify-between items-center mb-6">
            <span className="flex gap-1 items-center">
              <CalendarClock size={30} />
              <Label htmlFor="title">due date</Label>
            </span>
            <DueDateTask date={date} addDate={addDate} />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Task Description</Label>
            <Textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Type your message here."
              id="message"
              rows={5}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() =>
                dispatch(
                  addTask({
                    id: uuidv4(),
                    title: title,
                    state: state,
                    createDate: date?.from?.toLocaleDateString()!,
                    dueDate: date?.to?.toLocaleDateString()!,
                    desc: desc,
                    assignee: assignee,
                  })
                )
              }
              type="submit"
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
