using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class Goal : MonoBehaviour
{
 private void OntriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.CompareTag("ballTag"))
        {
            GameObject.Find("gameManagerObj").GetComponent<manager>().Player1Scored();
        }
    }
}
