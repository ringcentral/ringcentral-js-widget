import {
  RcButton,
  RcCheckbox,
  RcList,
  RcListItem,
} from '@ringcentral-integration/rcui';
import formatMessage from 'format-message';
import React, { FunctionComponent, useState } from 'react';
import { SelectListBasic } from 'ringcentral-widgets/components/SelectListBasic';

import {
  AvailableQueue,
  EvInboundQueuesUIFunctions,
  EvInboundQueuesUIProps,
} from '../../interfaces';
import i18n from './i18n';
import styles from './styles.scss';

export type InboundQueuesProps = EvInboundQueuesUIProps &
  EvInboundQueuesUIFunctions;

const InboundQueuesPanel: FunctionComponent<InboundQueuesProps> = ({
  searchOption,
  currentLocale,
  inboundQueues: inboundQueueSource,
  submitInboundQueues,
  getAssignedInboundQueues,
  isAllAssign,
  isSeveralAssign,
  checkBoxOnChange,
  allCheckBoxOnChange,
  goBack,
}) => {
  const [inboundQueuesState, setInboundQueuesState] = useState(
    inboundQueueSource,
  );

  const assignedInboundQueues = getAssignedInboundQueues(inboundQueuesState);
  const assignedInboundQueuesNumber = assignedInboundQueues.length;
  const allAssign = isAllAssign(assignedInboundQueues, inboundQueuesState);
  const severalAssign = isSeveralAssign(
    assignedInboundQueues,
    inboundQueuesState,
  );

  const renderListView = (inboundQueues: AvailableQueue[]) =>
    inboundQueues.length ? (
      <RcList>
        {inboundQueues.map(({ gateName, gateId, checked }, index) => {
          return (
            <RcListItem
              key={index}
              title={gateName}
              button
              singleLine
              size="small"
              onClick={(e) => {
                e.preventDefault();
                checkBoxOnChange(
                  gateId,
                  inboundQueuesState,
                  setInboundQueuesState,
                );
              }}
            >
              <RcCheckbox
                color="primary"
                formControlLabelProps={{
                  classes: {
                    root: styles.checkbox,
                    label: styles.label,
                  },
                }}
                label={gateName}
                checked={checked}
              />
            </RcListItem>
          );
        })}
      </RcList>
    ) : null;

  return (
    <>
      <SelectListBasic
        title={i18n.getString('inboundQueues', currentLocale)}
        placeholder={i18n.getString('search', currentLocale)}
        options={inboundQueuesState}
        searchOption={searchOption}
        currentLocale={currentLocale}
        renderListView={renderListView}
        selectListBasicClassName={styles.selectListBasic}
        backHeaderClassName={styles.backHeader}
        listContainerClassName={styles.listContainer}
        open
        onBackClick={goBack}
      />
      <div className={styles.bottomBar}>
        <div className={styles.selected}>
          <RcCheckbox
            color="primary"
            label={i18n.getString('selectAll', currentLocale)}
            data-sign="bulkChangeCheckBox"
            onClick={() =>
              allCheckBoxOnChange(
                severalAssign,
                inboundQueuesState,
                setInboundQueuesState,
              )
            }
            checked={allAssign}
            indeterminate={!!assignedInboundQueuesNumber && !allAssign}
          />
          <div className={styles.selectedTips} data-sign="selectedTips">
            {formatMessage(i18n.getString('selectedTips', currentLocale), {
              totalInboundQueuesNumber: inboundQueueSource.length,
              assignedInboundQueuesNumber,
            })}
          </div>
        </div>
        <RcButton
          data-sign="update"
          onClick={() => submitInboundQueues(assignedInboundQueues)}
          size="medium"
          fullWidth
        >
          {i18n.getString('update', currentLocale)}
        </RcButton>
      </div>
    </>
  );
};

export { InboundQueuesPanel };
