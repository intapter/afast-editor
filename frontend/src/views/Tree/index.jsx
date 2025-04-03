import styles from './index.module.scss';
import React from 'react';
import { ChevronDownIcon } from 'tdesign-icons-react';
import classnames from 'classnames';
const Tree = ({
  style,
  className,
  data,
  labelName = 'label',
  depth = 0,
  onSelect,
  currentActive,
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
        onClick={(e) => {
          e.stopPropagation();
          onSelect(data);
        }}
        className={classnames(
          styles.content,
          currentActive === data.id && styles.isActive,
        )}
        style={{ paddingLeft: 5 + depth * 5 }}
      >
        {data.children && data.children.length > 0 ? (
          <div
            onClick={() => {
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
