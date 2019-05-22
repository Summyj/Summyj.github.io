
<div class="copyright" >
  {% set current = date(Date.now(), "YYYY") %}
  &copy; {% if theme.since and theme.since != current %} {{ theme.since }} - {% endif %}
  <span itemprop="copyrightYear">{{ current }}</span>
  <span class="with-love">
    <i class="fa fa-{{ theme.authoricon }}"></i>
  </span>
  <span class="author" itemprop="copyrightHolder">{{ config.author }}</span>
</div>



{% if theme.copyright %}

 <div class="powered-by">
Hosted by <a href="https://coding.net/pages">CodingPages</a>
 </div>

  Powered by <a href="https://hexo.io/">Hexo</a>

<div class="theme-info">
  <div class="powered-by"></div>
  <i class="fa fa-pencil"></i>
  <span class="post-count">Total: {{ totalcount(site) }} words</span>
</div>

