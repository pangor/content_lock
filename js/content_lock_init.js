/**
 * @file
 *   Initialize onUnload scripts.
 */

Drupal.behaviors.content_lock = {
  attach: function(context) {
  window.content_lock_onleave = function  () {
    var nid = Drupal.settings.content_lock.nid;
    var ajax_key = Drupal.settings.content_lock.ajax_key;
    jQuery.ajax({
      url: Drupal.settings.basePath + 'ajax/content_lock/'+nid+'/canceledit',
      data: {k: ajax_key},
      async: false,
      cache: false
    });
  }

  window.content_lock_confirm = function () {
    return Drupal.t(Drupal.settings.content_lock.unload_js_message);
  }

    jQuery().onUserExit( {
      execute: content_lock_onleave,
      executeConfirm: content_lock_confirm,
      internalURLs: 'canceledit|trash/confirm|edit'
    });
  }
};
