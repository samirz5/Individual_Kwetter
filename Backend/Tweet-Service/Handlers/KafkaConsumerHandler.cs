using Confluent.Kafka;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Tweet_Service.Interfaces;

namespace Tweet_Service.Handlers
{
    public class KafkaConsumerHandler : IHostedService
    {
        private readonly IServiceScopeFactory factory;

        public KafkaConsumerHandler(IServiceScopeFactory factory)
        {
            this.factory = factory;
        }
        private readonly string topic = "delete_user_tweets_topic";

        public Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = factory.CreateScope();
            var tweetService = scope.ServiceProvider.GetRequiredService<ITweetService>();

            var conf = new ConsumerConfig
            {
                GroupId = "st_consumer_group",
                BootstrapServers = "localhost:9092",
                AutoOffsetReset = AutoOffsetReset.Earliest
            };
            using (var builder = new ConsumerBuilder<Ignore,
                string>(conf).Build())
            {
                builder.Subscribe(topic);
                var cancelToken = new CancellationTokenSource();
                try
                {
                    while (true)
                    {
                        var consumer = builder.Consume(cancelToken.Token);
                        Console.WriteLine($"Message: {consumer.Message.Value} received from {consumer.TopicPartitionOffset}");
                        tweetService.DeleteTweetsByUserId(consumer.Message.Value);
                    }
                }
                catch (Exception)
                {
                    builder.Close();
                }
            }
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
