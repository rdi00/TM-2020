using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class manager : MonoBehaviour
{
    [Header("Ball")]
    public GameObject ball;

    [Header("Score UI")]
    public GameObject playertext;

    private int playerScore;

    public void Player1Scored()
    {
        playerScore++;
        playertext.GetComponent<TextMeshProUGUI>().text = playerScore.ToString();
        ball.GetComponent<Ball>().increaseSpeed();
    }

    public void Reset()
    {
        playerScore = 0;
        playertext.GetComponent<TextMeshProUGUI>().text = playerScore.ToString();
    }

}
