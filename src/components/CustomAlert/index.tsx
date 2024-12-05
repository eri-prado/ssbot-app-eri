import React, { ReactNode } from 'react';
import { Portal, Dialog } from 'react-native-paper';

type icons = 'warning' | 'info' | 'success' | 'error'

interface CustomAlertProps {
  icon?: icons
  open: boolean;
  closeAlert?: () => void;
  title?: string;
  content: React.JSX.Element;
  actions: React.JSX.Element;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  open,
  closeAlert,
  title,
  icon,
  content,
  actions,
}) => {

  function getIconColor(icons: icons) {
    if (icons == 'warning') return '#f8bb86';
    if (icons == 'info') return '#3fc3ee';
    if (icons == 'success') return '#a5dc86';
    if (icons == 'error') return '#f27474';
  }

  function getIconName(icons: icons) {
    if (icons == 'warning') return 'alert-circle-outline';
    if (icons == 'info') return 'information-outline';
    if (icons == 'success') return 'check-circle-outline';
    if (icons == 'error') return 'close-circle-outline';
    return '';
  }

  return (
    <Portal>
      <Dialog visible={open} onDismiss={closeAlert} style={{ backgroundColor: '#f1f1f1' }}>
        {icon && <Dialog.Icon color={getIconColor(icon)} icon={getIconName(icon)} size={48} />}
        {title && (
          <Dialog.Title style={{ textAlign: 'center' }}>{title}</Dialog.Title>
        )}
        <Dialog.Content>{content}</Dialog.Content>
        <Dialog.Actions>{actions}</Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CustomAlert;
