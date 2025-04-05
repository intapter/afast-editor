import styles from './index.module.scss';
import React from 'react';
import { ChevronDownIcon, MoreIcon } from 'tdesign-icons-react';
import classnames from 'classnames';
import { Dropdown } from 'tdesign-react';
const Tree = ({
  style,
  className,
  data,
  labelName = 'label',
  depth = 0,
  onSelect,
  currentActive,
  onMenuClick,
  menu,
}) => {
  const [showChildren, setShowChildren] = React.useState(depth < 2);
  if (!data) return null;
  return (
    <div
      style={style}
      className={classnames(
        className,
        styles.tree,
        showChildren && styles.showChildren,
      )}
    >
      <div
        onClick={() => {
          onSelect(data);
        }}
        className={classnames(
          styles.content,
          currentActive === data.id && styles.isActive,
        )}
        style={{ paddingLeft: 5 + depth * 10 }}
      >
        {data.children && data.children.length > 0 ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowChildren(!showChildren);
            }}
            className={styles.icon}
          >
            <ChevronDownIcon />
          </div>
        ) : (
          <div className={styles.placeholder}></div>
        )}
        <span>{data[labelName]}</span>
        {menu ? (
          <Dropdown
            trigger="click"
            options={menu}
            onClick={(item, { e }) => {
              if (onMenuClick) onMenuClick(item, data);
              e.stopPropagation();
            }}
          >
            <MoreIcon
              className={classnames(styles.icon, styles.more)}
            ></MoreIcon>
          </Dropdown>
        ) : null}
      </div>
      <div className={styles.children}>
        {data.children
          ? data.children.map((child, i) => {
              return (
                <Tree
                  key={i}
                  style={style}
                  data={child}
                  labelName={labelName}
                  depth={depth + 1}
                  onSelect={onSelect}
                  menu={menu}
                  onMenuClick={onMenuClick}
                  currentActive={currentActive}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Tree;
