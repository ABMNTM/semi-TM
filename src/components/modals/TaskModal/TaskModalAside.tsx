import React, { FC, useContext, useEffect, useRef, useState } from "react";

import styles from "./TaskModal.module.css";
import {
  faArchive,
  faBalanceScale,
  faCalendarAlt,
  faCalendarMinus,
  faCheckCircle,
  faCircle,
  faClock,
  faGear,
  faList,
  faStopwatch,
  faTasks,
  faToggleOn,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import TextIcon from "@cmp/UI/TextIcon";

const TaskModalAside : FC = () => {
    return (
        <div className={styles.OperationList}>
          <div className={styles.Status}>
            <TextIcon
              IconSize="1.2rem"
              text={"status test"}
              rightIcons={[faToggleOn]}
            />
          </div>
          <div className={styles.TaskList}>
            <TextIcon
              IconSize="1.2rem"
              text={"task list test"}
              rightIcons={[faList]}
            />
          </div>
          <div className={styles.hr} />
          <div className={styles.Members}>
            <TextIcon IconSize="1.2rem" text="اعضا" rightIcons={[faUsers]} />
          </div>
          <div className={styles.SetStartTime + ' ' + styles['btn-disabled']}>
            <TextIcon
              IconSize="1.2rem"
              text="تعیین زمان شروع"
              rightIcons={[faCalendarAlt]}
            />
          </div>
          <div className={styles.DeadLine}>
            <TextIcon
              IconSize="1.2rem"
              text="تعیین سررسید"
              rightIcons={[faCalendarMinus]}
            />
          </div>
          <div className={styles.setColor}>
            <TextIcon text="تعیین رنگ" rightIcons={[faCircle]} />
          </div>
          <div className={styles.ChooseList}>
            <TextIcon
              IconSize="1.2rem"
              text="افزودن لیست انتخاب"
              rightIcons={[faTasks]}
            />
          </div>
          <div className={styles.Archeve}>
            <TextIcon
              IconSize="1.2rem"
              text="بایگانی"
              rightIcons={[faArchive]}
            />
          </div>
          <div className={styles.MoreSetting}>
            <TextIcon
              IconSize="1.2rem"
              text="تنظیمات بیشتر"
              rightIcons={[faGear]}
            />
          </div>
          <div className={styles.hr} />
          <div className={styles.SetWeight + ' ' + styles['btn-disabled']}>
            <TextIcon IconSize="1.2rem" text="تعیین وزن" rightIcons={[faBalanceScale]} />
          </div>
          <div className={styles.SetProgress + ' ' + styles['btn-disabled']}>
            <TextIcon IconSize="1.2rem" text="تعیین میزان پیشرفت" rightIcons={[faCheckCircle]} />
          </div>
          <div className={styles.SetTime + ' ' + styles['btn-disabled']}>
            <TextIcon IconSize="1.2rem" text="ثبت زمان" rightIcons={[faStopwatch]} />
          </div>
          <div className={styles.WholeTime}>
            <TextIcon IconSize="1.2rem" text="کل زمان: ۰:۰۰:۰۰ " rightIcons={[faClock]}/>
          </div>
        </div>
    )
}

export default TaskModalAside;