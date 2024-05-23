import React, { useContext, useEffect, useState } from "react";
import ListCard from "@cmp/data-display/ListCard";
import styles from "./ListContainer.module.css";
import ListCreator from "@cmp/forms/ListCreator";
import { ProjectContext } from "../../contexts/Projectcontext";
import customAxios, { baseURL } from "../../helpers/axios";
import { useRouter } from "next/router";

interface PropType {
    ProjectID: string;
}

const ListContainer = (props: PropType) => {
    // const [loadingHandle, setLoadingHandle] = useState() next version ...
    const ctx = useContext(ProjectContext);

    const FetchData = async () => {
        try {
            if (props.ProjectID) {
                const url = baseURL + "/list/all/" + props.ProjectID;
                const res = await customAxios.get(url);
                ctx.SetListLst(res.data);
            }
        } catch (e) {
            console.error('error in fetching lists: ', e)
        }
    }

    useEffect(() => {
        FetchData();
    }, [props.ProjectID])

    return (
        <main className={styles.taskContainer}>
        {ctx.lists.map((list) => (
          <ListCard key={list.id} id={list.id} name={list.name} tasks={list.tasks} />
        ))}
        <ListCreator projectID={props.ProjectID} />
      </main>
    )
}

export default ListContainer;