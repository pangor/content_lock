<?php
// $Id$

# Copyright (c) 2010 Impressive.media
# Author: Eugen Mayer
/*
 * Providing a administration interface for tagging.
 */
function content_lock_admin_settings() {
  $form['content_lock_admin_verbose'] = array(
      '#type' => 'checkbox',
      '#title' => t('Show lock / unlock messages'),
      '#description' => t('If you disable this option, no messages about unlock / lock of nodes are shown to the user anymore'),
      '#default_value' => variable_get('content_lock_admin_verbose', true),
  );

  $form['content_lock_admin_cancelbutton'] = array(
      '#type' => 'checkbox',
      '#title' => t('Add cancel button'),
      '#description' => t('Should a cancel button be added to the node / user / comment form. This way a user can properly cancel the transaction'),
      '#default_value' => variable_get('content_lock_admin_cancelbutton', true),
  );

  return system_settings_form($form);
}