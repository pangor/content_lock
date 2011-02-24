
/* ensure that anchors are properly replaced with buttons */
var content_lock_cancel_button_id = 0;

(function($) {
  window.content_lock_onleave = function  () {
    var nid = Drupal.settings.content_lock.nid;
    var protocol = $(location).attr('protocol');
    var host  = $(location).attr('host');
    var aurl = protocol+host+Drupal.settings.basePath + 'index.php?q=ajax/content_lock/'+nid+'/canceledit&k='+Drupal.settings.content_lock.ajax_key;
    $.ajax({
      url:   aurl,
      async: false,
      cache: false
    });
  }

  window.content_lock_confirm = function () {
    return Drupal.t('Be aware, if you press "OK" now, ALL your changes will be lost!');
  }

  $(document).ready(function() {
    $().onUserExit( {
      execute: content_lock_onleave,
      executeConfirm: content_lock_confirm,
      internalURLs: 'canceledit|trash/confirm|edit'
    });

    /*
     * upgrade cancel links to be <button />s. We do this in
     * javascript because <button />s require javascript to properly
     * work.
     */
      if (document.location && document.location.href) {
	  jQuery('a.form-submit-cancel').each(function(i, e) {
	      var elem = jQuery(e);
	      var url = elem.attr('href');
	      var text = elem.html();

	      elem.replaceWith('<button type="button" id="content-lock-cancel-button-' + content_lock_cancel_button_id + '" class="form-submit form-submit-cancel">' + text + '</button>');
	      jQuery('#content-lock-cancel-button-' + content_lock_cancel_button_id).bind('click', {'url': url}, function(e) {
		  /* prevent the confirmation dialogue */
		  userMovingWithinSite();
		  document.location.href = e.data.url;
		  return false;
	      });

	      content_lock_cancel_button_id ++;
	  });
      }
  });
})(jQuery);
